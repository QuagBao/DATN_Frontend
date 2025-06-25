export const formatTextWithLineBreaks = (text: string) => {
  return text.split('\n').map((item) => (
    <span key={`${item} - 1`}>
      {item}
      <br />
    </span>
  ))
}
