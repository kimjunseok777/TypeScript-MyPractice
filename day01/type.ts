


let a = 5 //--> 숫자로 선언했다  -->  a 는 자동으로 number 타입이 되는 것이다 (타입이 자동으로 추론된다)
// a = "안녕하세요" //--> a에 마우스를 대보면 number 타입만 들어간다는 게 확인된다 (주석 풀고 확인)

// 즉, a 는  -->  let a : number = 5 인 것이다
a = 7

// 이렇게 a 처럼 대놓고 추론이 되는 경우는 타입을 안적어도 된다
// 하지만 이런 경우는 적어야한다  -->  let a : number | string = 5  -->  숫자도 되고, 문자열도 되는 경우
// " | " 는 유니온타입 이라고 한다  -->  타입을 여러개 허용할 수 있다

let a2: number | string = 5
a2 = "안녕하세요"

let naming: "junseok" = "junseok" //--> 이런 타입도 된다 ("junseok" 만 들어갈 수 있다)
const variant: "primary" | "secondary" = "secondary"
//-->  이렇게 값으로도 타입 지정이 가능하다
//-->  자동완성이 되니까 DX 가 굉장히 올라간다


//===========================================================================


// type alias / interface


//===========================================================================


// type alias :

// 위처럼 일반 변수는 타입이 추론되게 그냥 놔둬도 괜찮다  -->  하지만 object 는 반드시 명시해줘야한다
const junseok = {
    age: 20
    // . . .  -->  밑의 person 을 만들 때 어떤 정보가 있었는지 다시 확인해야한다
}
console.log(junseok.age) //-->  이런 자동완성은 자바스크립트에서도 된다

// junseok 과 같은 카테코리 데이터로 또 다른 사람 정보를 만드려고한다  -->  어떤 정보가 있었는지 일일히 확인해야한다
const person = {
    age: 18,
    // . . .
}


//-->  이런 것들을 type 으로 만들어서 재사용할 수 있다
type Person = {
    age: number,
    address: string
}
const minsu: Person = {
    age: 20,
    address: ""
}
// age 또는 address 속성이 없을 때, minsu 에 "빠른수정" 을 누르면 자동으로 추가된다  -->  개발자 경험이 굉장히 올라간다
// 빠른수정 눌러도 되고, ctrl + i 눌러도 누락된 속성 나온다 (자동완성된다)

//-->  Person 타입을 재활용하여 타입을 지정할 수 있는 것이다
const minsu2: Person = {
    age: 0,
    address: ""
}

//--------------------------------------------------------------

// 이렇게 함수의 매개변수에도 타입을 지정해줄 수 있다
function addTodo({ title, content }: { title: string, content: string }) {

}
addTodo({
    title: "",
    content: ""
})

//--------------------------------------------------------------

// type alias 의 단점 : 중복선언이 불가하다, 상속이 되지 않아서 합성이 어렵다
//                        장점 : 타입에서 미리보기가 가능하다 (마우스 올리면 확인 가능하다)

//-->  합성할 때는 "&" 를 쓰면 된다
type Person2 = {
    age: number,
    address: string
} & {

} //-->  이런식으로 합성할 수 있다 (유니온과 달리, 두개의 타입을 합치는 것이다)
// 나머지 매개변수 등에서 타입 합성이 필요한 경우가 있다
//-->  & Component<'div'>  이런식으로도 합성할 수 있음


//===========================================================================


// interface :

interface People { //-->  이렇게 interface 는 "=" 붙이지 않는다
    age: number,
    address: string
}
interface People { //-->  interface 는 중복선언이 된다 (중복선언이 되면 자동으로 합쳐진다  -->  & 쓰지 않아도 된다)
    name: string
}
// 중복선언이 가능하다  -->  합성이 된다
// 상속이 가능하다  -->  & 대신에 extends 를 사용할 수 있다
// 다른 타입을 같이 사용할 때  -->  interface People extends Component<'div'>  -->  이렇게 사용하면 된다

const youngjun: People = { //-->  단점은 타입에서 미리보기가 불가능하다 (마우스 올려도 interface 란 것만 나온다)
    age: 0,
    address: "",
    name: ""
}