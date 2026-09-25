#!/bin/sh
set -eu

db_path="${VISITOR_DB_PATH:-/app/data/visitors.sqlite}"
db_dir="$(dirname "$db_path")"

storage_error() {
  echo "Visitor storage unavailable: $*" >&2
  echo "Mount a writable persistent directory at $db_dir, owned by container UID/GID 1000:1000. Reuse the existing volume to preserve visitor counts." >&2
  exit 1
}

mkdir -p "$db_dir" || storage_error "cannot create $db_dir"
if [ -L "$db_dir" ]; then
  storage_error "the database directory must not be a symbolic link"
fi

# A runtime mount replaces the image directory and its build-time permissions.
# Adjust only the SQLite directory/files, never recursively chown the volume.
if [ "$(id -u)" = 0 ]; then
  chown node:node "$db_dir" || storage_error "cannot set ownership on $db_dir"
  chmod u+rwx "$db_dir" || storage_error "cannot make $db_dir writable"
fi

for db_file in "$db_path" "$db_path-wal" "$db_path-shm" "$db_path-journal"; do
  if [ -L "$db_file" ]; then
    storage_error "$db_file must not be a symbolic link"
  fi
  if [ -e "$db_file" ]; then
    [ -f "$db_file" ] || storage_error "$db_file is not a regular file"
    if [ "$(id -u)" = 0 ]; then
      chown node:node "$db_file" || storage_error "cannot set ownership on $db_file"
      chmod u+rw "$db_file" || storage_error "cannot make $db_file writable"
    fi
    [ -w "$db_file" ] || storage_error "$db_file is not writable"
  fi
done

if [ "$(id -u)" = 0 ]; then
  # Recheck access as the app user and replace the shell so Node receives signals.
  exec su-exec node "$0" "$@"
fi

[ -w "$db_dir" ] && [ -x "$db_dir" ] || storage_error "$db_dir is not writable/searchable"
exec "$@"
