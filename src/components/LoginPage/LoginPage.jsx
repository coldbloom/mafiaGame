import React, {useEffect} from 'react';
import Background from './../../assets/login 1.svg'
import {useSelector, useDispatch} from "react-redux";
import { setChain } from './../../features/Chains/ChainsSlice'
import './LoginPage.scss'

const LoginPage = (props) => {
    console.log(props)

    // useEffect(() => {
    //     const root = document.querySelector('#root')
    //     root.style = `background-image: url(${Background})`
    // }, [])

    const {chains, chainId} = useSelector(state => state.chains)
    const dispatch = useDispatch()

    return (
        <div className="login-page flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="window__inner login-window">
                    <div className="text-4xl text-white text-center pt-8 pb-8"><label htmlFor='select_rpc'>RPC Endpoint</label></div>
                    <div className="select-box text-4xl mb-6">
                        <select onChange={e => dispatch(setChain(e))} defaultValue={chainId} name="" id="select_rpc">
                            {
                                chains.map((chain, i) => {
                                    return <option key={i} value={chain.chainId}>{chain.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className="">
                        <button
                            onClick={props.children.ual.showModal}
                            className='text-3xl text-white button-container'>
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;