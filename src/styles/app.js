import { createGlobalStyle } from 'styled-components'

export const ContainerGlobal = createGlobalStyle`
*{
    box-sizing:border-box;
}
html, body{
    color: #fff;
    font-size: 14px;
    font-family: Arial;
    margin: 0;
    padding: 0;
}
div, img, figure, figcaption, h1,h2, p{
    margin: 0;
    padding:0; 
}
button,select{
    border:0;
    :focus{
        outline:none
    }
}
a{
    color: #0b3c88;
}
`
