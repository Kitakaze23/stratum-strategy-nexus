/** The admin signs in with a plain login; auth requires an email, so derive a fixed synthetic one. */
export function usernameToEmail(login: string): string {
  const clean = login.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
  return `${clean}@admin.stratum-consulting.ru`;
}
