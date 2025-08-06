import { BlogEntry, ClsBlogEntry } from "../ClsBlogEntry";


export class BlogAppMain {

  private m_vector_blog_entries? : Array<BlogEntry>;

  constructor() {


  }


  public addMockUpBlogEntry()
  {
    let i = this.getArrayLength();

      let blog_entry =  this.getBlogEntry1( i , 1, "Admin Workflow" );

      console.log(`Element Nummer ${i} ${ blog_entry.m_entry_header }`);

      this.addBlogEntry( blog_entry );
  }


  public generateMockUpBlogEntries()
  {
    for (let i = 0; i < 10; i++)
    {
      let blog_entry =  this.getBlogEntry1( i , 1, "Admin Workflow" );

      console.log(`Element Nummer ${i} ${ blog_entry.m_entry_header }`);

      this.addBlogEntry( blog_entry );

    }
  }







    /**
   * Loescht alle Elemente im Vektor und stellt die Vektorinstanz auf undefined.
   */
  public clear ()
  {
    /*
     * Pruefung: Variable "m_calc_zahlung_vector" ungleich undefined?
     *
     * Ist der Vektor nicht vorhanden, sind auch keine Elemente zum loeschen vorhanden
     */
    if ( this.m_vector_blog_entries != undefined )
    {
      var aktueller_index = 0;

      var BlogEntry_vector_anzahl = this.getArrayLength();
    }

    /*
      * Am Funktionsende wird die Vektorinstanz auf undefined gestellt.
      */
    this.m_vector_blog_entries = undefined;
  }


  /**
   * Versucht die Instanz aus dem Parameter dem Vektor hinzuzufuegen.
   *
   * Ist die Parameter-Instanz "undefined" wird nichts hinzugefuegt und FALSE zurueckgegeben.
   *
   * @param pClsBlogEntry die hinzuzufuegende InstanZ
   *
   * @return TRUE wenn die Instanz dem Vektor hinzugefuegt werden konnte, sonst FALSE
   */
  public addBlogEntry( pClsBlogEntry : BlogEntry ) : boolean
  {
    /*
     * Pruefung: Parameterinstanz ungleich "undefined" ?
     */
    if ( pClsBlogEntry != undefined )
    {
      try
      {
        /*
         * Ist die Parameterinstanz vorhanden, wird diese mit der Funktion "push" dem Vektor hinzugefuegt.
         */
        this.getVektor().push( pClsBlogEntry );

        /*
         * Der Aufrufder bekommt TRUE zurueck
         */
        return true;
      }
      catch ( err_inst )
      {
        //System.Console.WriteLine("Fehler: errAddBlogEntry " + err_inst.Message);
      }
    }

    /*
     * Vorgaberueckgabe ist FALSE (Fehler oder Parameterinstanz nicht gesetzt)
     */
    return false;
  }


  /**
   * @return die Vektorinstanz. Ist diese noch nicht vorhanden, wird diese erstellt.
   */
  public getVektor() : Array<BlogEntry>
  {
    /*
     * Pruefung: Vektor noch nicht erstellt ?
     */
    if ( this.m_vector_blog_entries == undefined )
    {
      /*
       * Ist die Vektorinstanz noch undefined, wird eine neue
       * Instanz der Klasse Array erstellt und dem
       * Vektor zugewiesen.
       */
      this.m_vector_blog_entries = new Array();
    }

    return this.m_vector_blog_entries;
  }



  /**
   * @return  die Anzahl der im Vektor gespeicherten Elemente
   */
  public getArrayLength () : number
  {
    /*
     * Pruefung: Ist der Vektor vorhanden ?
     *
     * Ist der Vektor vorhanden, bekommt der Aufrufer den Wert der Funktion "length" zurueck.
     *
     * Ist der Vektor noch nicht vorhanden, koennen noch keine Elemente
     * gespeichert worden sein. Der Aufrufer bekommt 0 zurueck.
     *
     */
    if ( this.m_vector_blog_entries != undefined )
    {
      return this.m_vector_blog_entries.length;
    }

    return 0;
  }



  /**
   * @return die Vektorinstanz. Ist diese noch nicht vorhanden, wird diese erstellt.
   */
  public getBlogEntry( blog_entry_id : number ) : BlogEntry | undefined
  {
    let ergebnis_obj : any;

    /*
     * Pruefung: Vektor noch nicht erstellt ?
     */
    if ( this.m_vector_blog_entries != undefined )
    {
      ergebnis_obj = this.m_vector_blog_entries.filter( blog_entry_p =>  blog_entry_p.m_entry_id ===  blog_entry_id )

      if ( ergebnis_obj !== undefined )
      {
        return ergebnis_obj[0] as BlogEntry;
      }
    }

    return undefined;
  }



  private addDateMonate ( pDatum : Date | undefined, pAnzahlMonate : number, pKnzTag : number ) : Date
  {
    if ( pDatum === undefined )
    {
      pDatum = new Date();
    }

    if ( pAnzahlMonate === undefined )
    {
      return pDatum;
    }

    if ( pKnzTag === undefined )
    {
      pKnzTag = 0;
    }

    /*
     * Datumsbestandteile ermitteln
     * Die Werte fuer Jahr, Monat und Tag werden aus dem Parameter "pDatum" in die
     * Variablen dieser Funktion ueberfuehrt.
     */
    var datum_jahr  = pDatum.getFullYear();

    var datum_monat = pDatum.getMonth() + 1;

    var datum_tag   = pDatum.getDate();

    var add_monate_total = Math.abs( Number( pAnzahlMonate ) );

    /*
     * Berechnung Jahre und Monate
     * Es werden die vollen Jahre aus der Anzahl der Monate rausgerechnet.
     * Das ist immer ein positiver Betrag.
     */
    var add_jahre       = Number( Math.floor( add_monate_total / 12.0 ) );

    var add_monate_rest = Number( add_monate_total - ( add_jahre * 12.0 ) );

    /*
     * Pruefung: Monate groesser 0?
     */
    if ( Number( pAnzahlMonate ) > 0 )
    {
      /*
       * Anzahl Monate > 0
       * Die vollen Jahre werden auf das Jahr aus dem Parameter hinzuaddiert
       * Die restlichen Monate werden auf den Monat aus dem Parameter hinzuaddiert.
       */
      datum_jahr  += add_jahre;

      datum_monat += add_monate_rest;

      /*
       * Pruefung: ueberlauf Jahr
       * Bedingung: Ergebnismonat groesser 12
       *
       * Wenn dem so ist, wird das Jahr um 1 erhoeht und von den
       * Ergebnismonaten 12 abgezogen.
       */
      if ( datum_monat > 12 )
      {
        datum_jahr  += 1;

        datum_monat -= 12;
      }
    }
    else if ( Number( pAnzahlMonate ) < 0 )
    {
      /*
       * Anzahl Monate kleiner 0
       * Die vollen Jahre werden vom Ergebnisjahr abgezogen.
       * Die restlichen Monate werden vom Ergebnismonat abgezogen.
       */
      datum_jahr  -= add_jahre;

      datum_monat -= add_monate_rest;

      /*
       * Pruefung: Jahreswechsel
       * Bedingung: Ergebnismonat kleiner gleich 0
       * Wenn dem so ist, wird das Ergebnisjahr um 1 verringert.
       * Der Ergebnismonat berechnet sich, indem der Ergebnismonatswert
       * der Zahl 12 hinzuaddiert wird. Da aber der Ergebnismonatswert
       * hier negativ ist kommt es zu einer Subtraktion.
       */
      if ( datum_monat <= 0 )
      {
        datum_jahr--;

        datum_monat = 12 + datum_monat;
      }
    }

    if ( pKnzTag < 0 )
    {
      datum_tag = 1;
    }
    else
    {
      var anzahl_tage = 31;

      switch ( Number( datum_monat ) )
      {
        case 2 :
        {
          /* Schaltjahr? */
          if ( ( ( Number( datum_jahr ) % 400 ) == 0 ) || ( ( Number( datum_jahr ) % 100 ) > 0 ) && ( ( Number( datum_jahr ) % 4 ) == 0 ) )
          {
            anzahl_tage = 29;
          }
          else
          {
            anzahl_tage = 28;
          }
          break;
        }

        case  4 :
        case  6 :
        case  9 :
        case 11 :
          anzahl_tage = 30;
          break;
      }

      if ( pKnzTag > 0 )
      {
        datum_tag = anzahl_tage;
      }
      else
      {
        //if ( ( Number( datum_monat ) === 2 ) && ( &&Number( datum_tag ) > 28 ) )
        if ( datum_tag > anzahl_tage )
        {
          datum_tag = anzahl_tage;
        }
      }
    }
    return new Date( datum_jahr, datum_monat - 1, datum_tag );
  }


   private getBlogEntry1( nr: number, user_id : number, user_name : string  ) : BlogEntry
   {

    let text_header : string = "";

    let text_entry : string = "";


   if ( nr === 0 )
   {
    text_header = "History of personal computers";

    text_entry = `The history of the personal computer as a mass-market consumer electronic device began with the microcomputer revolution of the 1970s. A personal computer is one intended for interactive individual use, as opposed to a mainframe computer where the end user's requests are filtered through operating staff, or a time-sharing system in which one large processor is shared by many individuals. After the development of the microprocessor, individual personal computers were low enough in cost that they eventually became affordable consumer goods. Early personal computers – generally called microcomputers – were sold often in electronic kit form and in limited numbers, and were of interest mostly to hobbyists and technicians.

    The history of the personal computer as mass-market consumer electronic devices effectively began in 1977 with the introduction of microcomputers, although some mainframe and minicomputers had been applied as single-user systems much earlier. A personal computer is one intended for interactive individual use, as opposed to a mainframe computer where the end user's requests are filtered through operating staff, or a time sharing system in which one large processor is shared by many individuals. After the development of the microprocessor, individual personal computers were low enough in cost that they eventually became affordable consumer goods. Early personal computers – generally called microcomputers – were sold often in electronic kit form and in limited numbers, and were of interest mostly to hobbyists and technicians.

    `;

   }
   else if ( nr === 1 )
   {
    text_header = "ZX Spectrum"
    text_entry = `The ZX Spectrum (UK: /zɛd ɛks/) is an 8-bit home computer developed and marketed by Sinclair Research. The Spectrum played a pivotal role in the history of personal computers and video games, especially in the United Kingdom. It was one of the all-time bestselling British computers with over five million units sold. It was released in the UK on 23 April 1982, the United States in 1983, and Europe in 1984.

The machine was designed by the English entrepreneur and inventor Sir Clive Sinclair and his small team in Cambridge, and was manufactured in Dundee, Scotland by Timex Corporation.[5] It was made to be small, simple, and most importantly inexpensive, with as few components as possible. The addendum "Spectrum" was chosen to highlight the machine's colour display, which differed from the black-and-white display of its predecessor, the ZX81. Rick Dickinson designed its distinctive case, rainbow motif, and rubber keyboard. Video output is transmitted to a television set rather than a dedicated monitor, while application software is loaded and saved onto compact audio cassettes.

The ZX Spectrum was initially distributed by mail order, but after severe backlogs it was sold through High Street chains in the United Kingdom. It was released in the US as the Timex Sinclair 2068 in 1983, and in some parts of Europe as the Timex Computer 2048. There are seven models overall, ranging from the entry level with 16 KB RAM released in 1982 to the ZX Spectrum +3 with 128 KB RAM and built-in floppy disk drive in 1987. The machine primarily competed with the Commodore 64, BBC Micro, Dragon 32, and the Amstrad CPC range. Over 24,000 software products were released for the ZX Spectrum.[1]

Its introduction led to a boom in companies producing software and hardware, the effects of which are still seen. It was among the first home computers aimed at a mainstream UK audience, with some crediting it for launching the British information technology industry. The Spectrum was Britain's top-selling computer until the Amstrad PCW surpassed it in the 1990s.[6][7][8] It was discontinued in 1992. `
   }
   else if ( nr === 2 )
   {
    text_header = "Apple II (original)"
    text_entry = `The Apple II (stylized as apple ][) is a personal computer released by Apple Inc. in June 1977. It was one of the first successful mass-produced microcomputer products and is widely regarded as one of the most important personal computers of all time due to its role in popularizing home computing and influencing later software development.[3][4][5][6][7]

The Apple II was designed primarily by Steve Wozniak. The system is based around the 8-bit MOS Technology 6502 microprocessor. Jerry Manock designed the foam-molded plastic case,[8] Rod Holt developed the switching power supply,[9] while Steve Jobs was not involved in the design of the computer.[10] It was introduced by Jobs and Wozniak at the 1977 West Coast Computer Faire, and marks Apple's first launch of a computer aimed at a consumer market—branded toward American households rather than businessmen or computer hobbyists.[11]
The three computers that Byte magazine referred to as the "1977 Trinity" of home computing: Commodore PET 2001, Apple II, and TRS-80 Model I

Byte magazine referred to the Apple II, Commodore PET 2001, and TRS-80 as the "1977 Trinity".[12] As the Apple II had the defining feature of being able to display color graphics, the Apple logo was redesigned to have a spectrum of colors.[13][14]

The Apple II was the first in a series of computers collectively referred to by the Apple II name. It was followed by the Apple II+, Apple IIe, Apple IIc, Apple IIc Plus, and the 16-bit Apple IIGS—all of which remained compatible. Production of the last available model, the Apple IIe, ceased in November 1993.`
   }
   else if ( nr === 3 )
   {
    text_header = "Amiga 500"
    text_entry = `The Amiga 500, also known as the A500, was the first popular version of the Amiga home computer, "redefining the home computer market and making so-called luxury features such as multitasking and colour a standard long before Microsoft or Apple sold these to the masses."[2] It contains the same Motorola 68000 as the Amiga 1000, as well as the same graphics and sound coprocessors, but is in a smaller case similar to that of the Commodore 128.

Commodore announced the Amiga 500 at the January 1987 winter Consumer Electronics Show – at the same time as the high-end Amiga 2000. It was initially available in the Netherlands in April 1987, then the rest of Europe in May.[3] In North America and the UK it was released in October 1987 with a US$699/£499 list price. It competed directly against models in the Atari ST line.

The Amiga 500 was sold in the same retail outlets as the Commodore 64, as opposed to the computer store-only Amiga 1000. It proved to be Commodore's best-selling model, particularly in Europe.[4] Although popular with hobbyists, arguably its most widespread use was as a gaming machine, where its graphics and sound were of significant benefit. It was followed by a revised version of the computer, the Amiga 500 Plus, and the 500 series was discontinued in 1992. `
   }
   else if ( nr === 4 )
   {
    text_header = "Commodore PET"
    text_entry = `The Commodore PET is a line of personal computers produced starting in 1977 by Commodore International.[3] A single all-in-one case combines a MOS Technology 6502 microprocessor, Commodore BASIC in read-only memory, keyboard, monochrome monitor, and, in early models, a cassette deck.

Development of the system began in 1976, and it was demonstrated and sold as the first personal computer for the masses at the January 1977 Consumer Electronics Show.[1] The name "PET" was suggested by Andre Souson after he saw the Pet Rock in Los Gatos, and stated they were going to make the "pet computer".[5] It was backronymed to Personal Electronic Transactor. In a 1995 retrospective, Byte magazine—and subsequently many others—referred to the PET, Apple II and TRS-80 collectively as the "1977 trinity" of pioneering personal computers. [6]

Following the initial PET 2001, the design was updated through a series of models with more memory, better keyboard, larger screen, and other modifications. The systems were a top seller in the Canadian and United States education markets, as well as for business use in Europe.

The PET line was discontinued in 1982 after approximately 219,000 machines were sold. `
   }
   else if ( nr === 5 )
   {
    text_header = "TRS-80"
    text_entry = `The TRS-80 Micro Computer System (TRS-80, later renamed the Model I to distinguish it from successors) is a desktop microcomputer developed by American company Tandy Corporation and sold through their Radio Shack stores. Launched in 1977, it is one of the earliest mass-produced and mass-marketed retail home computers.[4] The name is an abbreviation of Tandy Radio Shack, Z80 [microprocessor], referring to its Zilog Z80 8-bit microprocessor.[5]

The TRS-80 has a full-stroke QWERTY keyboard, 4 KB dynamic random-access memory (DRAM) standard memory, small size and desk area, floating-point Level I BASIC language interpreter in read-only memory (ROM), 64-character-per-line video monitor, and had a starting price of US$600[1] (equivalent to US$3,100 in 2024). A cassette tape drive for program storage was included in the original package. While the software environment was stable, the cassette load/save process combined with keyboard bounce issues and a troublesome Expansion Interface contributed to the Model I's reputation as not well-suited for serious use. Initially (until 1981), it lacked support for lowercase characters which may have hampered business adoption. An extensive line of upgrades and add-on hardware peripherals for the TRS-80 was developed and marketed by Tandy/Radio Shack. The basic system can be expanded with up to 48 KB of RAM (in 16 KB increments), and up to four floppy disk drives and/or hard disk drives. Tandy/Radio Shack provided full-service support including upgrade, repair, and training services in their thousands of stores worldwide.

By 1979, the TRS-80 had the largest selection of software in the microcomputer market.[6] Until 1982, the TRS-80 was the bestselling PC line, outselling the Apple II by a factor of five according to one analysis.[5] The broadly compatible TRS-80 Model III was released in the middle of 1980. The Model I was discontinued shortly thereafter, primarily due to stricter Federal Communications Commission (FCC) regulations on radio-frequency interference to nearby electronic devices.[7][8] In April 1983, the Model III was succeeded by the compatible TRS-80 Model 4. Following the original Model I and its compatible descendants, the TRS-80 name became a generic brand used on other unrelated computer lines sold by Tandy, including the TRS-80 Model II, TRS-80 Model 2000, TRS-80 Model 100, TRS-80 Color Computer, and TRS-80 Pocket Computer. `
   }
   else if ( nr === 6 )
   {
    text_header = "Commodore 64"
    text_entry = `The Commodore 64, also known as the C64, is an 8-bit home computer introduced in January 1982 by Commodore International (first shown at the Consumer Electronics Show, January 7–10, 1982, in Las Vegas).[4] It has been listed in the Guinness World Records as the best-selling desktop computer model of all time,[5] with independent estimates placing the number sold between 12.5 and 17 million units.[2] Volume production started in early 1982, marketing in August for US$595 (equivalent to $1,940 in 2024).[6] Preceded by the VIC-20 and Commodore PET, the C64 took its name from its 64 kilobytes (65,536 bytes) of RAM. With support for multicolor sprites and a custom chip for waveform generation, the C64 could create superior visuals and audio compared to systems without such custom hardware.
\n\n
The C64 dominated the low-end computer market (except in the UK, France and Japan, lasting only about six months in Japan[7]) for most of the later years of the 1980s.[8] For a substantial period (1983–1986), the C64 had between 30% and 40% share of the US market and two million units sold per year,[9] outselling IBM PC compatibles, the Apple II, and Atari 8-bit computers. Sam Tramiel, a later Atari president and the son of Commodore's founder, said in a 1989 interview, "When I was at Commodore we were building 400,000 C64s a month for a couple of years."[10] In the UK market, the C64 faced competition from the BBC Micro, the ZX Spectrum, and later the Amstrad CPC 464,[11] but the C64 was still the second-most-popular computer in the UK after the ZX Spectrum.[12] The Commodore 64 failed to make any impact in Japan, as their market was dominated by Japanese computers, such as the NEC PC-8801, Sharp X1, Fujitsu FM-7 and MSX,[13] and in France, where the ZX Spectrum, Thomson MO5 and TO7, and Amstrad CPC 464 dominated the market.[14]

Part of the Commodore 64's success was its sale in regular retail stores instead of only electronics or computer hobbyist specialty stores. Commodore produced many of its parts in-house to control costs, including custom integrated circuit chips from MOS Technology. In the United States, it has been compared to the Ford Model T automobile for its role in bringing a new technology to middle-class households via creative and affordable mass-production.[15] Approximately 10,000 commercial software titles have been made for the Commodore 64, including development tools, office productivity applications, and video games.[16] C64 emulators allow anyone with a modern computer, or a compatible video game console, to run these programs today. The C64 is also credited with popularizing the computer demoscene and is still used today by some computer hobbyists.[17] In 2011, 17 years after it was taken off the market, research showed that brand recognition for the model was still at 87%.`
   }
   else
   {
    text_header = `Blog Nr ${ nr }`
    text_entry = `Text Nr ${ nr }`
   }


    return this.getMockUpBlockEntry( nr, user_id, user_name, text_header, text_entry );
   }


  private getMockUpBlockEntry( nr: number, user_id : number, user_name : string, entry_header : string, entry_text : string  ) : ClsBlogEntry
  {
    const date = this.addDateMonate( undefined, nr * (-1), 0 );

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const date_format_long = `${year}${month}${day}`;
    const date_format_string = `${day}.${month}.${year}`;

    let blog_entry = new ClsBlogEntry();

    blog_entry.m_user_id = user_id;

    blog_entry.m_user_name = user_name;

    blog_entry.m_entry_header = entry_header;

    blog_entry.m_entry_id = nr;

    blog_entry.m_entry_text = entry_text

    blog_entry.m_entry_date_number = Number( date_format_long );

    blog_entry.m_entry_date_string = date_format_string;

    return blog_entry;
  }



}
