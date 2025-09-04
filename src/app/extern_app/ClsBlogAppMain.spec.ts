import { BlogAppMain } from "./ClsBlogAppMain";
import { ClsBlogEntry } from "../ClsBlogEntry";

describe('BlogAppMain', () =>
{
  let appx : BlogAppMain;

  beforeEach(async () =>
  {
    appx = new BlogAppMain();
  });


  it('should be 0 at start', () =>
  {
    expect( appx.getArrayLength() ).toBe( 0 );
  });


  it('should be 1 Mockup Block Entry', () =>
  {
    appx.addMockUpBlogEntry();

    expect( appx.getArrayLength() ).toBe( 1 );
  });


  it('should be the startup count Mockup Block Entries', () =>
  {
    appx.generateMockUpBlogEntries();

    let array_length = appx.getArrayLength();

    expect( appx.getArrayLength() ).toBe( appx.getMockUpStartCount() );
  });


  it('should be 1 Mockup Block Entry more', () =>
  {
    appx.generateMockUpBlogEntries();

    appx.addMockUpBlogEntry();

    expect( appx.getArrayLength() ).toBe( appx.getMockUpStartCount() + 1 );
  });


  it('should be one less', () =>
  {
    appx.generateMockUpBlogEntries();

    expect( appx.getArrayLength() ).toBe( appx.getMockUpStartCount() );

    let cls_blog_entry  = appx.getBlogEntryIndex( 18 );

    expect( cls_blog_entry ).toBeTruthy();

    let entry_id_str : string = "" + cls_blog_entry!.m_entry_id;

    expect( appx.hasBlogEntryId( entry_id_str ) ).toBeTrue();

    appx.deleteBlogEntry( entry_id_str );

    expect( appx.getArrayLength() ).toBe( appx.getMockUpStartCount() - 1 );
  });


  it('should be Instance of ClsBlockEntry and the right one', () =>
  {
    appx.generateMockUpBlogEntries();

    expect( appx.getArrayLength() ).toBe( appx.getMockUpStartCount() );

    let cls_blog_entry  = appx.getBlogEntryIndex( 18 );

    expect( cls_blog_entry ).toBeTruthy();

    expect( cls_blog_entry ).toBeInstanceOf( ClsBlogEntry );

    expect( cls_blog_entry!.m_entry_header ).toBe( `Blog Nr 18` );

    expect( cls_blog_entry!.m_entry_text ).toBe( `Text Nr 18` );

    let entry_id_str : string = "" + cls_blog_entry!.m_entry_id;

    expect( appx.hasBlogEntryId( entry_id_str ) ).toBeTrue();
  });


  it('should be able to store new BlogEntries', () =>
  {
    let test_nr           : number = 40;
    let test_user_id      : number = 234;
    let test_user_name    : string = "test_user_id";
    let test_entry_header : string = "test_entry_header";
    let test_entry_text   : string = "test_entry_text";

    let test_blog_entry : ClsBlogEntry = appx.getMockUpBlockEntry( test_nr, test_user_id, test_user_name, test_entry_header, test_entry_text );

    appx.generateMockUpBlogEntries();

    expect( appx.getArrayLength() ).toBe( appx.getMockUpStartCount() );

    appx.addBlogEntry( test_blog_entry );

    expect( appx.getArrayLength() ).toBe( appx.getMockUpStartCount() + 1 );

    expect( appx.hasBlogEntryId( test_blog_entry.m_entry_id ) ).toBeTrue();

    let index_blog_entry : number = appx.getIndexBlogEntryId( test_blog_entry.m_entry_id );

    expect( index_blog_entry ).toBeGreaterThan( 0 );

    let cls_blog_entry = appx.getBlogEntryIndex( index_blog_entry );

    expect( cls_blog_entry ).toBeTruthy();

    expect( cls_blog_entry ).toBeInstanceOf( ClsBlogEntry );

    expect( cls_blog_entry ).toBeTruthy();

    expect( cls_blog_entry!.m_entry_id ).toBe( test_blog_entry.m_entry_id  );
  });


  it('should be an empty Instance of ClsBlockEntry ', () => {

    let cls_blog_entry = appx.getEmptyBlockEntry();

    expect( cls_blog_entry ).toBeTruthy();

    expect( cls_blog_entry ).toBeInstanceOf( ClsBlogEntry );

    expect( cls_blog_entry!.m_user_id ).toBe( -2 );

    expect( cls_blog_entry!.m_entry_id ).toBe( "-2" );

    expect( cls_blog_entry!.m_entry_date_number ).toBe( 0 );

    let entry_id_str : string = "" + cls_blog_entry!.m_entry_id;

    expect( appx.hasBlogEntryId( entry_id_str ) ).toBeFalse();
  });

});
