export interface BlogUser
{
  m_user_id      : number;
  m_user_name    : string;
  m_is_logged_in : boolean;
}

export class ClsBlogUser implements BlogUser
{
  m_user_id      : number = 0
  m_user_name    : string = "Guest";
  m_is_logged_in : boolean = false;
}
