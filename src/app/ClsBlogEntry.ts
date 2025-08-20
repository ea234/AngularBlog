export interface BlogEntry
{
  id : string; /* only for json-server */
  m_user_id           : number;
  m_user_name         : string;

  m_entry_id          : string;
  m_entry_header      : string;
  m_entry_text        : string;
  m_entry_date_number : number;
  m_entry_date_string : string;
}

export class ClsBlogEntry implements BlogEntry
{
  id : string = ""; /* only for json-server */

  m_user_id           : number = 0
  m_user_name         : string = "";

  m_entry_id          : string = "0";
  m_entry_header      : string = "New Entry";
  m_entry_text        : string = "New Text";
  m_entry_date_number : number = 0;
  m_entry_date_string : string = "";
}
