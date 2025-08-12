
export function getDateString() : string {

    const date = new Date();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    //const date_format_long = `${year}${month}${day}`;
    let date_format_string = `${day}.${month}.${year}`;

    return date_format_string;
}

export function getDateNumber() : number
{
  const date = new Date();

  return ( date.getFullYear() * 10000 ) + ( date.getMonth() * 100 ) + date.getDate();
}
