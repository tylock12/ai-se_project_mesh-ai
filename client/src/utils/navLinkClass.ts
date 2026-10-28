export function getNavLinkClass({ isActive }: { isActive: boolean }) {
  return isActive ? "form__link form__link_active" : "form__link";
}
