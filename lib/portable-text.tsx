export const ptLinkMark = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link: ({ value, children }: any) => (
    <a href={value?.href} target="_blank" rel="noopener noreferrer">{children}</a>
  ),
}
