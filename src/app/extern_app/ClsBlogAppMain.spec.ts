import { BlogAppMain } from "./ClsBlogAppMain";
import { BlogEntry, ClsBlogEntry } from "../ClsBlogEntry";

describe('BlogAppMain', () => {

  let appx : BlogAppMain;

  beforeEach(async () => {

    appx = new BlogAppMain();
  });

  it('should be 0 at start', () => {
    expect( appx.getArrayLength() ).toBe( 0 );
  });

  it('should be 1 Mockup Block Entry', () => {

    appx.addMockUpBlogEntry();

    let array_length = appx.getArrayLength()

    expect( array_length ).toBe( 1 );
  });


  it('should be 20 Mockup Block Entries', () => {

    appx.generateMockUpBlogEntries();

    let array_length = appx.getArrayLength()

    expect( array_length ).toBe( 20 );
  });


  it('should be 21 Mockup Block Entries', () => {

    appx.generateMockUpBlogEntries();
    appx.addMockUpBlogEntry();

    let array_length = appx.getArrayLength()

    expect( array_length ).toBe( 21 );
  });



  it('should be one less', () => {

    appx.generateMockUpBlogEntries();

    let array_length = appx.getArrayLength()

    expect( array_length ).toBe( 20 );

    let cls_blog_entry  = appx.getBlogEntryIndex( 18 );

    expect( cls_blog_entry ).toBeTruthy();

    let entry_id_str : string = "" + cls_blog_entry!.m_entry_id;

    expect( appx.hasBlogEntryId( entry_id_str ) ).toBeTrue();

    appx.deleteBlogEntry( entry_id_str );

    array_length = appx.getArrayLength()

    expect( array_length ).toBe( 19 );
  });


  it('should be Instance of ClsBlockEntry and the right one', () => {

    appx.generateMockUpBlogEntries();

    let array_length = appx.getArrayLength()

    expect( array_length ).toBe( 20 );

    let cls_blog_entry  = appx.getBlogEntryIndex( 18 );

    expect( cls_blog_entry ).toBeTruthy();
    expect( cls_blog_entry ).toBeInstanceOf( ClsBlogEntry );

    expect( cls_blog_entry!.m_entry_header ).toBe( `Blog Nr 18` );
    expect( cls_blog_entry!.m_entry_text ).toBe( `Text Nr 18` );

    let entry_id_str : string = "" + cls_blog_entry!.m_entry_id;

    expect( appx.hasBlogEntryId( entry_id_str ) ).toBeTrue();
  });





});
