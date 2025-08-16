
export function getDateString() : string
{
    const date_inst = new Date();

    const year = date_inst.getFullYear();

    const month = ( date_inst.getMonth() + 1 ).toString().padStart( 2, '0' );

    const day = date_inst.getDate().toString().padStart(2, '0');

    let date_format_string = `${day}.${month}.${year}`;

    return date_format_string;
}

export function getDateNumber() : number
{
  const date_inst = new Date();

  return ( date_inst.getFullYear() * 10000 ) + ( date_inst.getMonth() * 100 ) + date_inst.getDate();
}
