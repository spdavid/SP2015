namespace main {
    export class TestCallBack {

        static init() {

            TestCallBack.doHelloWorld(TestCallBack.myCallBackFunction);
            TestCallBack.doHelloWorld(TestCallBack.myCallBackFunctionLog);

        }

        static doHelloWorld(callback: (str : string, str2 : string) => any) {
            // Call the callback
            callback('Hello', "World");
        }


        static myCallBackFunction (text1, text2) {
            alert(text1 + " " + text2);
        }

        static myCallBackFunctionLog(text1, text2) {
            console.log(text1 + " " + text2);
        }

    }
}