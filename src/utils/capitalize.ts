export const capitalize = (str: string | null | undefined): string | undefined => {
  return str
    ? str.split(' ')
      .map(word => word
        .charAt(0)
        .toUpperCase() +
                word.slice(1).toLocaleLowerCase()
      )
      .join(' ')
    : undefined
}
