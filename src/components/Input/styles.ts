import styled, { css } from 'styled-components';

// interface ContainerProps {
//     isFocused: boolean;
//     isFilled: boolean;
// }

export const Container = styled.div`
        background: #232119;
        border-radius: 10px;
        border: 2px solid #232129;
        color: #666360;
        padding: 16px;
        width: 100%;

        display: flex;
        align-items: center;

        & + div{
            margin-top: 8px;
           }


        input{
            flex:1;
            background: transparent;
            border: 0;
            color: #fff;

            &::placeholder{
            color: #666360;

            
        }

       
        }

       svg{
        margin-right: 16px;
       }
`;