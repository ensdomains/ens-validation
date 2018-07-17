enum TransliterationDirection {
  /**
   * FORWARD means from &lt;source&gt; to &lt;target&gt; for a
   * transliterator with ID &lt;source&gt;-&lt;target&gt;.  For a transliterator
   * opened using a rule, it means forward direction rules, e.g.,
   * "A > B".
   */
  FORWARD,

  /**
   * REVERSE means from &lt;target&gt; to &lt;source&gt; for a
   * transliterator with ID &lt;source&gt;-&lt;target&gt;.  For a transliterator
   * opened using a rule, it means reverse direction rules, e.g.,
   * "A < B".
   */
  REVERSE,
}

export class Transliterator {
  private readonly map: { [key: string]: string };
  private readonly direction: TransliterationDirection;
  constructor(
    map: { [key: string]: string },
    direction: TransliterationDirection = TransliterationDirection.FORWARD,
  ) {
    this.direction = direction;
    this.map =
      this.direction === TransliterationDirection.FORWARD
        ? map
        : Object.create(Object.entries(map).reverse());
  }
  public transliterate(string: string): string {
    return string
      .split('')
      .map(character => {
        return this.map[character] || character;
      })
      .join('');
  }
}
