var main;
(function (main) {
    var TestCallBack = (function () {
        function TestCallBack() {
        }
        TestCallBack.init = function () {
            TestCallBack.doHelloWorld(TestCallBack.myCallBackFunction);
            TestCallBack.doHelloWorld(TestCallBack.myCallBackFunctionLog);
        };
        TestCallBack.doHelloWorld = function (callback) {
            // Call the callback
            callback('Hello', "World");
        };
        TestCallBack.myCallBackFunction = function (text1, text2) {
            alert(text1 + " " + text2);
        };
        TestCallBack.myCallBackFunctionLog = function (text1, text2) {
            console.log(text1 + " " + text2);
        };
        return TestCallBack;
    }());
    main.TestCallBack = TestCallBack;
})(main || (main = {}));
