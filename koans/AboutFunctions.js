describe("About Functions", function() {

  it("should declare functions", function() {

    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).toBe(3);
  });

  it("should know internal variables override outer variables", function () {
    var message = "Outer";

    function getMessage() {
      return message;
    }

    function overrideMessage() {
      var message = "Inner";
      return message;
    }

    expect(getMessage()).toBe("Outer");
    expect(overrideMessage()).toBe("Inner");
    expect(message).toBe("Outer");//전역변수
  });

  it("should have lexical scoping", function () {
    var variable = "top-level";
    function parentfunction() {
      var variable = "local";
      function childfunction() {
        return variable;
      }
      return childfunction();
    }
    expect(parentfunction()).toBe("local");//차근차근 순서대로
  });

  it("should use lexical scoping to synthesise functions", function () {

    function makeMysteryFunction(makerValue)
    {
      var newFunction = function doMysteriousThing(param)
      {
        return makerValue + param;
      };
      return newFunction;
    }

    var mysteryFunction3 = makeMysteryFunction(3);//3+10
    var mysteryFunction5 = makeMysteryFunction(5);//5+5

    expect(mysteryFunction3(10) + mysteryFunction5(5)).toBe(23);
  });

  it("should allow extra function arguments", function () {

    function returnFirstArg(firstArg) {
      return firstArg;
    }

    expect(returnFirstArg("first", "second", "third")).toBe("first");
    //첫번째 인자만
    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }

    expect(returnSecondArg("only give first arg")).toBe(undefined);

    function returnAllArgs() {
      var argsArray = [];
      for (var i = 0; i < arguments.length; i += 1) {
        argsArray.push(arguments[i]);
      }
      return argsArray.join(",");
      //join() 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만듦(,가 들어가면 사이에 ,)
    }

    expect(returnAllArgs("first", "second", "third")).toBe("first,second,third");
  });

  it("should pass functions as values", function () {

    var appendRules = function (name) {
      return name + " rules!";
    };

    var appendDoubleRules = function (name) {
      return name + " totally rules!";
    };

    var praiseSinger = { givePraise: appendRules };
    expect(praiseSinger.givePraise("John")).toBe("John rules!");

    praiseSinger.givePraise = appendDoubleRules;
    expect(praiseSinger.givePraise("Mary")).toBe("Mary totally rules!");

  });
});
