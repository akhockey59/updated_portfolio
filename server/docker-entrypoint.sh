#!/bin/sh
set -eu

db_path="${VISITOR_DB_PATH:-/data/visitors.sqlite}"
db_dir="$(dirname "$db_path")"

storage_error() {
  echo "Visitor storage unavailable: $*" >&2
  echo "Mount persistent storage at $db_dir with read/write access for the running UID/GID $(id -u):$(id -g). Ownership changes are not required if access is already granted. Reuse the existing volume to preserve visitor counts." >&2
  exit 1
}

mkdir -p "$db_dir" || storage_error "cannot create $db_dir"
if [ -L "$db_dir" ]; then
  storage_error "the database directory must not be a symbolic link"
fi

# Managed storage can be writable through group permissions or ACLs while
# forbidding chown. Validate access without changing ownership or permissions.
for db_file in "$db_path" "$db_path-wal" "$db_path-shm" "$db_path-journal"; do
  if [ -L "$db_file" ]; then
    storage_error "$db_file must not be a symbolic link"
  fi
  if [ -e "$db_file" ]; then
    [ -f "$db_file" ] || storage_error "$db_file is not a regular file"
    [ -r "$db_file" ] && [ -w "$db_file" ] || storage_error "$db_file is not readable/writable"
  fi
done

[ -w "$db_dir" ] && [ -x "$db_dir" ] || storage_error "$db_dir is not writable/searchable"

# Test a real write: mode bits alone do not detect read-only runtime mounts.
# Only this uniquely named probe is removed; database and journal files are untouched.
probe="$(mktemp "$db_dir/.portfolio-write-check.XXXXXX")" || storage_error "cannot create a file in $db_dir"
trap 'rm -f "$probe"' 0
rm -f "$probe" || storage_error "cannot remove the storage write probe"
trap - 0

# Keep the runtime identity selected by the Dockerfile or hosting platform.
exec "$@"
