/**
 * Created by MYigit on 27.12.2016.
 */
//    var numbers = Rx.Observable.interval(1000).take(5);
    //    numbers.subscribe(x => console.log(x));
let socket = null;
function init() {

    var webSocket = Rx.Observable.webSocket({
        url: 'ws://bogazici1.hivecdn.fmdev:10000/socket/ws',
        closingObserver: {
            next: function (x) {
                console.log("closingObserver", x)
            }
        },
        closeObserver: {
            next: function (x) {
                console.log("closeObserver", x)
            }
        },
        openObserver: {
            next: function (x) {
                console.log("openObserver", x)


            }
        }

    }).catch(function (err) {
        console.log("err-> ", err)
    })
        .retry(3)
        .do(function (x) {
            console.log("socket", x)
        })
        .share();
    socket = webSocket;
    setInterval(function () {
        webSocket.next(1)
        socket.next(2)
    }, 2000)
    webSocket.subscribe(
        e => console.log(`res: ${e}`),
        e => console.error(e),
        () => console.log('complete')
    );

    return webSocket;
}


