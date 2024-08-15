


// 사용하면 안되는 타입에 대해서 정의해보자

let a: any = 3 //--> any 는 일반 자바스크립트와 다를게 없기 때문에 사용하면 안된다
console.log(a)

let b: unknown = 3 //--> any 대신에 unknown 을 사용하면 된다 (unknown 은 아직 이 타입을 알 수 없다는 것이다)
//--> 즉, unknown 은 나중에 이 타입을 지정해줘야한다 (타입가드 해줘야한다)

if (typeof b === "string") {
    b.charAt(-1) //--> 이렇게 charAt 같은 문자열 메소드를 사용할 수 있게 된다 (이거는 위에 이미 3이라고 number 지정했기에 작동 안한다)
}
//==> 이것을 "타입가드" 라고 한다 (type guard)
//==> 타입이 불명확할 때, 타입 지정을 통해 타입이 정해져있다고 가정하는 것이다
// b 는 unknown 이지만 타입가드를 통해서 타입을 정해준 것이다

// if (typeof b === "string")  -->  밑에 타입가드 하면서 주석처리 해줬다


//===========================================================================


// 밑에 타입가드 하면서 새로 선언해준 b 이다
let c = { //--> c 는 어떠한 객체이다  -->  name 이 있을 수도 있고 없을 수도 있다
    age: 20,
    type: "person",
}
// as const :
//-->  이렇게 as const 라고 타입을 지정해줘야 type 에 'string' 이 아니라 "person" 이 제대로 들어간다
//-->  as const 를 하면 readonly 가 되어서 바꿀 수 없다 (상수로 만들어주는 것)  -->  값을 바꿀 수 없다


//===========================================================================


// 타입가드함수 만들어보자

type People = {
    type: string,
    age: number,
    name: string
}  //--> People , Person 의 다른 점은 내부에 있는 type 이 people 이냐 person 에 따라 달라진다

type Person = {
    type: string,
    age: number
}

function isString(args: any): args is Person { //--> args 가 Person 이냐고 물어보는 것이다 (args 가 Person 타입이야?)
    return args.type === 'person' //--> args 의 type 이 person 이 맞냐?  -->  이게 맞다면 위의 "args is Person" 가 true 인 것이다 (아니면 false 이다)
}

// 이 함수는 args 가 People 인지 확인하는 함수이다
function isPeople(args: any): args is People { //--> args is People 가 true 가 나와야하는 것이다
    return args.type === 'people' //--> args 가 People 인 것이 true 가 되려면 type 은 "people" 이어야 한다
}

//-----------------------------------------------------------

function isPeople2(args: People | Person): args is People {
    return args.type === 'people'
    //-->  c 에서 type 의 값을 "people" 이라고 만들어줬었다
}

if (isPeople2(c)) {
    c.name //-->  People 이다
} else {
    c.age //-->  Person 이다
}
//==>  c 가 People 일 때는 name 속성이 존재하지만, 아니면 존재하지 않는다 (구분하기 위해서 타입가드를 한다  -->  함수형으로 만든 타입가드)

// 이게 타입가드이다
// 원래 조건으로 분기처리해주면 되는데, 이렇게 굳이 타입가드 하는 이유는 "자동완성" 때문이다


//===========================================================================


// 사용하면 안되는 타입
let d: object = {}
let e: Function = () => console.log("function")

// 타입은 타입 안정성을 위해서 사용하는 것이다  -->  포괄적이지 않고 자세할 수록 좋다
// 타입스크립트를 할 때 자동완성 안되면 타입 지정을 해줘야한다


//===========================================================================


// Array type

// 1. [] 두는 표현방법  -->  타입이 하나일 때 쓰는 것이 좋음

const f: (number | string)[] = [1, 2, 3]


// 2. Array 로 감싸는 표현방법  -->  타입이 하나 이상일 때 쓰면 좋음

//-->  1. 요소의 타입을 만들고 재사용하여 배열 타입을 만든 것
export type Todo = { //--> import type { Todo } from "/"  -->  통째로 import 받으면 번들사이즈가 커지기에 type 만 가져오는 것이다
    id: number,
    title: string,
    content: string,
    state: boolean
}
type TodoList = Array<Todo>

//-----------------------------

//-->  2. 배열 타입이 주어졌을 때 요소의 타입을 가지고 오는 방법
type TodoList2 = Array<{
    id: number,
    title: string,
    content: string,
    state: boolean
}>
type Todo2 = TodoList2[number] //--> 배열의 index 는 숫자이기에 number 로 해준 것 (배열 접근법 사용)
//--> TodoList2 의 요소를 가져온 것이다 (인덱스 접근)


//===========================================================================


// 타입을 명확히 했을 때 가장 큰 장점

const todos: TodoList = [
    {
        id: 0,
        title: "",
        content: "",
        state: false
    } //--> 이렇게 자동완성이 되기 때문에 다른 곳 가서 요소 뭐있는지 확인할 필요가 없다
]
//--> 배열의 고차함수를 사용해도 자동완성이 되고 타입이 안정적이다
// (자바스크립트였으면 고차함수 사용할 때 요소 적을 때 자동완성 안된다)
todos.map((todo) => todo.id)


//===========================================================================


// 함수 타입 :
function addNumber(num1: number, num2: number): number { //--> 마지막에 넣어준 타입은, 반환하는 return 값이 number 라는 의미이다
    return num1 + num2
}
const g = addNumber(2, 3) //--> g 를 보면 number 타입이다


// 유틸 타입 :
//--> 우리들이 타입을 쉽게 지정할 수 있도록 도와주는 유틸리티성 타입이다
const useTodo = () => {
    const state: Todo = {
        id: 0,
        title: "",
        content: "",
        state: false
    }
    const addTodo = () => { }
    return { state, addTodo } //--> return 하는 타입을 일일히 지정하는 것보다 더 좋은 방법이 있다
}

// const h: ReturnType<typeof useTodo> = useTodo() //-->  이렇게 하면 h 에는 useTodo() 가 반환하는 값 밖에 들어오지 못한다 (return 타입 지정)
const h = useTodo()
//--> 물론, 이렇게 h 만 써도 타입추론이 되지만, 이렇게 하는 이유는 addTodo 만 따로 타입이 필요할 수도 있기 때문이다
//--> 이 타입을 그대로 다시 정의하는 것보다, 정의하는 것이 훨씬 좋다 --> ex) props 로 전달할 때

type Props = {
    addTodo: ReturnType<typeof useTodo>['addTodo'] //--> 이렇게 객체의 키값으로도 타입을 가져올 수 있다
    // useTodo 가 반환하는 함수의 타입을 가져올 수 있다  -->  React 에서 props 전달할 때 매우 유용하다
}
//==>  함수의 반환형을 타입으로 지정해 재사용이 가능하다

//==>  이런 타입들을 "유틸타입" 이라고 한다  -->  우리들이 타입들을 쉽게 짤 수 있도록 도와주는 친구이다


//===========================================================================


type Post = {
    title: string
    content: string
    nickName?: string //--> 닉네임이 있어도 되고 없어도 된다면 "?" 하나 넣어주면 된다 (옵셔널 지정)
    //--> 자동으로 nickName 이 string | undefined 가 된다
}

const post: Post = {
    title: "",
    content: "",
    // nickName: "" //--> 있어도 되고 없어도 된다
}


// Omit : 제거
//-->  Post 의 nickName 이란 속성만 빼고 가져오겠다는 것이다 (유니온 사용할 수 있다  -->  content)
const postWithOutNickName: Omit<Post, 'nickName' | 'content'> = {
    title: ""
} //-->  이렇게 title 과 content 밖에 못쓴다 (nickName 속성 사용할 수 없다  -->  빼준 것이다)


// Pick : 선택
//-->  Post 의 title 이란 속성만 가져오겠다는 것이다 (유니온 사용해서 가져올 것 추가해줄 수 있다 --> nickName)
const postWithTitle: Pick<Post, 'title' | 'nickName'> = {
    title: "",
    nickName: ""
}


// Partial : 모두 옵셔널 (속성 전부 다 ? 사용해주기 애매하니 파샬타입 사용)
const postWithOptional: Partial<Post> = {
    //--> 아무것도 안넣어도 오류는 나지 않는다  -->  대신 타입이 안정적이다 (자동완성 된다)
    title: ""
}
// 주의사항이 있다  -->  모두 옵셔널 하기 때문에 undefined 할 수도 있다
// 단순하게 post.content 에 접근하는 것은 문제가 안된다
// 하지만, post.user.nickName 이렇게 nickName 에 접근하면 문제가 생긴다 --> user 가 undefined 면 nickName 이 있을 수 없다

//--> post.user?.nickName  -->  이렇게 ? 넣어줘야 한다 (user 가 있다면 ~)  -->  하지만 또 nickName 이 undefined 일 수도 있다
//--> post.user?.nickName!
//--> ! 는 단언이다  -->  있다라는 확신이다  -->  웬만하면 사용하지 말자  -->  그냥 조건문으로 에러처리해주는 것이 좋다\
const postExample: {
    title: string
    User?: {
        nickName?: string
    }
} = {
    title: ""
}

function func() {
    if (!postExample.User) throw new Error('User 가 존재하지 않습니다') //--> ! 쓰지 않고 이렇게 조건문 걸어주는 것이 좋다
    if (!postExample.User.nickName) return //--> ! 쓰지 않고 이렇게 조건문 걸어주는 것이 좋다  -->  위에서 이미 User 조건문 해줬기에 ? 도 필요 없어진다
    const nickName: string = postExample.User.nickName
}


//===========================================================================


// as const 타입

const theme = { //--> theme 같은 친구들은 바뀔 일이 없다
    white: "#ffffff",
    red: "#f00"
} as const //--> 이렇게 as const 붙여주면 readonly 가 붙고 string 이 아니라 값 자체가 타입으로 들어간다

type ButtonProps = {
    color: keyof typeof theme //--> 이렇게 하면 컬러가 white | red 가 들어간다 (white 와 red 밖에 못사용한다 --> 타입 지정)
}
// 나중에 이렇게 속성 줄 수 있는 것이다
/*
    const Button = ({color}) => {}
    {
        color: theme[color]  -->  white 아니면 red 가 들어온다
    }
*/
//==>  객체를 생성하면 객체의 키로 구성된 타입만 따로 구성할 수 있다
//==>  상수일 때랑, 공용 컴포넌트, 디자인 시스템 만들 때 많이 사용한다


//===========================================================================


// 제네릭 타입
// 하나의 함수를 재활용하여 다양한 인스턴스로 활용하는 것

function checkNull(args?: number): number { //--> 인자로 number 를 받고, number 타입을 return 하는 함수이다
    // if(!args) return  -->  number 반환해야 하니, 아무것도 반환 안하면 오류뜬다 (밑에처럼 throw err 처리 해주자)
    if (!args) throw new Error('args is null')
    return args
}

//==>  하지만 문제가 있다 --> 숫자 뿐만 아니라 string, object ... 등등 더 많은 타입을 null 인지 체크하려면 어떡해야할까?
//==>  (args?: number | string | ... ): number | string | ... {}  -->  이렇게 계속 늘려주는 것은 말이 안된다  -->  제네릭 타입을 사용해보자

//==>  매개변수의 타입을 자동으로 받아와 주는 친구가 있었으면 좋겠다  -->  제네릭 타입
// 제네릭타입의 가장 큰 장점 : 우리가 받은 친구의 타입을 가지고 와서 그대로 정의할 수 있다


// 제네릭 타입 :
function checkGenericNull1<T>(args: T): T { //--> checkGenericNull1 의 인자로 어떠한 타입도 들어갈 수 있게 된다 <T> 가 들어온 인자 타입에 따라 동적으로 변한다
    if (!args) throw new Error('args is null')
    return args
}

//-----------------------------

// any 보다 이 제네릭 타입이 훨신 타입이 안정적이다 --> extends 를 사용해서 추가로 타입 (로직) 을 넣을 수 있다
function checkGenericNull2<T extends Todo>(args: T): T {
    args.content //--> Todo 에 있는 친구도 사용하기에 자동완성이 된다 (상속, 확장 시킬 수 있다)
    if (!args) throw new Error('args is null')
    return args
}
// 만약 해당 함수 안에 로직이 복잡하게 작성될 경우 any 를 작성하면 타입이 안정적이지 못하지만, 제네릭을 사용하면 안정적이다

//-----------------------------

function checkGenericNull3<T>(args: any): T { //--> 이번에는 인자 타입을 any 타입으로 설정해줬다
    if (!args) throw new Error('args is null')
    return args as T //--> args 를 any 타입에서 T 로 바꿔준 것이다 --> 하단에 T 에 string 을 넣어줬다
}
const i = checkGenericNull3<string>("3") // 여기에 string 이라고 넣게 되면, 위에 함수에 T 에 string 이 들어가는 것이다
//-->  "3" 을 넣었을 때 return 하는 타입이 string 이라고 만들어준 것이다
//--> 이렇게 i 가 string 타입이라고 만들어준 것이다 (타입을 바꿀 수도 있으면서, 안정적으로 만들 수 있다)

//-----------------------------

// 제네릭타입 정리 :
//--> 동일한 함수가 재생성 되는 것을 막고, 제네릭 타입을 통해서 같은 인자가 들어갔음에도 내뱉는 타입을 다르게할 수 있다
//--> 제네릭은 하나의 함수의 활용성을 굉장히 높인다

// 대표적으로 제네틸으로 타입 주는 친구가 useState 이다  -->  값을 주면 그 값으로 자동으로 추론이 된다
//-->  return 하는 타입이, 우리들이 준 값이어야 한다 (제네릭타입)

/*
    const [state, setState] = useState({ title : "title" })  -->  자동으로 타입을 추론해서 state 에 부여가된다
    setState({ title : x })  -->  그래서 setState 할 때에도 title 이 없으면 안된다 (반드시 필요하다)

    * 정리 *
    state 는 { title : string } 타입이 주어져있다
    --> setState( 3 ) // error  -->  이거 하면 에러가 발생한다
    useState 내부에서 제네릭으로 타입을 받고 setState 에 해당 제네릭 타입만 들어오도록 정의했기 때문이다 (setState 할 때도 이 양식에 맞춰서 정의해야한다)
*/

//-----------------------------

// useState 함수 제네릭타입으로 간단 예시
// [ type : type ]  -->  튜플타입
const useState = <T>(args?: T): [T | undefined, (args: T) => void] => { //--> 반환타입을 명시해준 것이다 (1, 2번째 인자 반환 타입 지정해준 것이다)
    let state = args
    const setState = (nextState: T) => { state = nextState } //--> setState 가 발동하면, state 를 nextState 값 바꾸는 함수이다
    return [state, setState]
}

const [stateA, setStateA] = useState<Todo>()

setStateA({
    id: 0,
    title: "",
    content: "",
    state: false
})


//===========================================================================