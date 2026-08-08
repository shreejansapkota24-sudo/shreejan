/**
 * Open an external link in a real new top-level browser tab.
 *
 * Inside embedded previews (iframes) a plain <a target="_blank"> can end up
 * navigating the frame itself, and sites like Facebook / LinkedIn / Instagram
 * refuse to be framed (ERR_BLOCKED_BY_RESPONSE). Forcing the open from the
 * top-level window avoids that entirely.
 */
export const openExternal = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) => {
  if (!/^https?:/i.test(href)) return; // let mailto:/tel:/hash links behave normally
  e.preventDefault();
  const target = (() => {
    try {
      return window.top ?? window;
    } catch {
      return window;
    }
  })();
  target.open(href, "_blank", "noopener,noreferrer");
};
