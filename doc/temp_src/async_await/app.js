/*
 * Demo-Code for this video (Part 1, of the video)
 *
 * Asynchronous JavaScript Course – Async/Await , Promises, Callbacks, Fetch API
 *
 * https://www.youtube.com/watch?v=OFpqvaJ3QYg
 */

function consolePrint( headline_to_print )
{
    console.log( " " );
    console.log( "----------------------------------------------------------" );
    console.log( "" + headline_to_print );
    console.log( "----------------------------------------------------------" );
    console.log( " " );
}

function task1_V1() { setTimeout( () => console.log( "Task 1" ), 2000 ); }
function task2_V1() { setTimeout( () => console.log( "Task 2" ), 2500 ); }
function task3_V1() { setTimeout( () => console.log( "Task 3" ), 500  ); }
function task4_V1() { setTimeout( () => console.log( "Task 4" ), 1500 ); }
function task5_V1() { setTimeout( () => console.log( "Task 5" ), 1000 ); }

function test_v1()
{
    consolePrint( "Test 1 - Function calls" );
    
    task1_V1();
    task2_V1();
    task3_V1();
    task4_V1();
    task5_V1();
}

/*
 * ----------------------------------------------------------------------------
 */

function task1_V2( callback ) { setTimeout( () => { console.log( "Task 1" ); callback(); }, 2000 ); }
function task2_V2( callback ) { setTimeout( () => { console.log( "Task 2" ); callback(); }, 2500 ); }
function task3_V2( callback ) { setTimeout( () => { console.log( "Task 3" ); callback(); }, 500  ); }
function task4_V2( callback ) { setTimeout( () => { console.log( "Task 4" ); callback(); }, 1500 ); }
function task5_V2( callback ) { setTimeout( () => { console.log( "Task 5" ); callback(); }, 1000 ); }

function test_v2()
{
    consolePrint( "Test 2 - Callback-Functions" );

    let callback_finished = () => { console.log( "finished" );     };

    let callback_task_5   = () => { task5_V2( callback_finished ); };
    let callback_task_4   = () => { task4_V2( callback_task_5 );   };
    let callback_task_3   = () => { task3_V2( callback_task_4 );   };
    let callback_task_2   = () => { task2_V2( callback_task_3 );   };

    task1_V2( callback_task_2 );
}

/*
 * ----------------------------------------------------------------------------
 */

function test_promise_v1()
{
    const promise_v1 = new Promise( ( resolve, reject ) => {

        const all_went_well = true;

        if ( all_went_well )
        {
            resolve( "promise_v1: Resolve CallBack()" );
        }
        else
        {
            reject( "promise_v1: Reject CallBack()" );
        }
    });

    consolePrint( "Test - Promise 1" );

    console.log( promise_v1 );
}

/*
 * ----------------------------------------------------------------------------
 */

function test_promise_v2_1()
{
    const promise_v2 = new Promise( ( resolve, reject ) => {

        const random_number = Math.floor( Math.random() * 10 );

        setTimeout( () => { 

            if ( random_number < 4 )
            {
                resolve( "promise_v2: Resolve CallBack()  - random_number = " + random_number );
            }
            else
            {
                reject( "promise_v2: Reject CallBack() - random_number = " + random_number );
            }
        
        }, 2000 );

    });

    consolePrint( "Test - Promise 2 - Consume a promise the old way" );

    console.log( promise_v2 );

    /*
     * Consume a promise the old way "then" and "catch"
     */
    promise_v2.then(  ( value ) => { console.log( value ); } )
              .catch( ( error ) => { console.log( error ); } );
}

/*
 * ----------------------------------------------------------------------------
 */

function test_promise_v3()
{
    const promise_v3_1 = new Promise( ( resolve, reject ) => { resolve( "promise_v3_1: Resolve CallBack()" ) } );
    const promise_v3_2 = new Promise( ( resolve, reject ) => { resolve( "promise_v3_2: Resolve CallBack()" ) } );
    const promise_v3_3 = new Promise( ( resolve, reject ) => { reject(  "promise_v3_3: Reject CallBack()"  ) } );

    consolePrint( "Test - Promise 3 - Chaining promises" );

    /*
     * Chaining promises
     */
    promise_v3_1.then(  ( value ) => { console.log( value ); return promise_v3_2 } )
                .then(  ( value ) => { console.log( value ); return promise_v3_3 } )
                .catch( ( error ) => { console.log( error ); } );
}

/*
 * ----------------------------------------------------------------------------
 */

function test_promise_v4()
{
    const promise_v4_1 = new Promise( ( resolve, reject ) => { setTimeout( () => { resolve( "apromise_v4_1: Resolve CallBack()" ) }, 2000 ) } );
    const promise_v4_2 = new Promise( ( resolve, reject ) => { setTimeout( () => { resolve( "apromise_v4_2: Resolve CallBack()" ) }, 1000 ) } );
    const promise_v4_3 = new Promise( ( resolve, reject ) => { setTimeout( () => { reject(  "apromise_v4_3: Reject CallBack()"  ) }, 2500 ) } );

    consolePrint( "Test - Promise 4 - Promise all-function" );

    /*
     * Function Promise all
     */
    Promise.all( [ promise_v4_1, promise_v4_2 ] )
    .then(  ( data  ) => { console.log( data[0], data[1] ) } )
    .catch( ( error ) => { console.log( error );           } );

    /*
     * Function Promise all
     */
    Promise.all( [ promise_v4_1, promise_v4_2, promise_v4_3 ] )
    .then(  ( data  ) => { console.log( "then-callback: ", data[0], data[1] , data[2] ) } )
    .catch( ( error ) => { console.log( "catch-callback: ", error ); } );
}

/*
 * ----------------------------------------------------------------------------
 */

const task1_V3 = () =>
{ 
    return new Promise( ( resolve, reject ) => 
        { 
            setTimeout( () => 
                {
                    const task1_V3_ok = true;

                    if ( task1_V3_ok )
                    {
                        resolve( "task1_V3: Resolve CallBack()" ) 
                    }
                    else
                    {
                        reject( "task1_V3: Reject CallBack()" ) 
                    }
                    
                }, 2000 ) 
        } );
}

const task2_V3 = () =>
{ 
    return new Promise( ( resolve, reject ) => 
        { 
            setTimeout( () => 
                {
                    const task2_V3_ok = true;

                    if ( task2_V3_ok )
                    {
                        resolve( "task2_V3: Resolve CallBack()" ) 
                    }
                    else
                    {
                        reject( "task2_V3: Reject CallBack()" ) 
                    }
                    
                }, 1000 ) 
        } );
}

const task3_V3 = () =>
{ 
    return new Promise( ( resolve, reject ) => 
        { 
            setTimeout( () => 
                {
                    const task3_V3_ok = true;

                    if ( task3_V3_ok )
                    {
                        resolve( "task3_V3: Resolve CallBack()" ) 
                    }
                    else
                    {
                        reject( "task3_V3: Reject CallBack()" ) 
                    }
                    
                }, 2000 ) 
        } );
}


const task4_V3 = () =>
{ 
    return new Promise( ( resolve, reject ) => 
        { 
            setTimeout( () => 
                {
                    const task4_V3_ok = false;

                    if ( task4_V3_ok )
                    {
                        resolve( "task4_V3: Resolve CallBack()" ) 
                    }
                    else
                    {
                        reject( "task4_V3: Reject CallBack()" ) 
                    }
                    
                }, 2000 ) 
        } );
}


const call_async_task_v1 = async () => {

    const result_task1_V3 = await task1_V3();

    console.log( "call_async_task_v1: result_task1_V3 ", result_task1_V3 );

    const result_task2_V3 = await task2_V3();

    console.log( "call_async_task_v1: result_task2_V3 ", result_task2_V3 );

    const result_task3_V3 = await task3_V3();

    console.log( "call_async_task_v1: result_task3_V3 ", result_task3_V3 );
}


const call_async_task_v2 = async () => {

    try 
    {
        const result_task1_V3 = await task1_V3();

        console.log( "call_async_task_v2: result_task1_V3 ", result_task1_V3 );

        const result_task2_V3 = await task2_V3();

        console.log( "call_async_task_v2: result_task2_V3 ", result_task2_V3 );

        const result_task3_V3 = await task3_V3();

        console.log( "call_async_task_v2: result_task3_V3 ", result_task3_V3 );

        const result_task4_V3 = await task4_V3();

        console.log( "call_async_task_v2: result_task4_V3 ", result_task4_V3 );
    }
    catch( error )
    {
       console.log( "call_async_task_v2: error ", error );
    }
}


function test_promise_v5_1()
{
    consolePrint( "Test - Promise 5 - Async Await 1" );

    call_async_task_v1();
}

function test_promise_v5_2()
{
    consolePrint( "Test - Promise 5 - Async Await 2" );

    call_async_task_v2();
}


//test_v1();

//test_v2();

//test_promise_v1();

//test_promise_v2();

//test_promise_v3();

//test_promise_v4();

//test_promise_v4_1();

//test_promise_v5_1();

console.log("End Java-Script");