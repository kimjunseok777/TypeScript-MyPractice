import React, { ComponentPropsWithRef } from "react";


const theme = {
    white: "#fff"
} as const

type Props = {
    variant: 'primary' | 'secondary',
    color: keyof typeof theme
} & ComponentPropsWithRef<'button'> //--> ref 는 빼고 props 다 가져온다는 뜻 (children 도 들어가있다)

// ComponentPropsWithRef 안할거라면 : PropsWithChildren<Props>  -->  이렇게 해야 안에 children 이 생긴다

// FC 는 함수형 컴포넌트를 의미 (안줘도 되는데, 폰트 컬러가 탈라지기에 구분이 쉬워서 줬다  -->  일반함수랑 구분이 편해진다)
const Button: React.FC<Props> = ({variant, color, children, ...rest}) => { //--> 이렇게 제네릭으로 Props 넣어주면 타입 지정된다
    
    return <button {...rest}>{children}</button>
}
export default Button