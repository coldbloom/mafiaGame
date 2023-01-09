import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {UserInfoService} from './../../services/UserInfo'

const Game = (props) => {
    const dispatch = useDispatch()
    const userInfoService = new UserInfoService()
    console.log(props)
    const activeUser = props.children.ual.activeUser.accountName


    const fetchUserData = async () => {
        const loop = async () => {
            const result = await userInfoService.getUser(props.children.ual.activeUser)
            console.log(props.children.ual.activeUser)
            //console.log(result)
            // if no data about user
            //if (!result.rows[0]) {
            console.log('условие')
            try {
                await userInfoService.createNewUser(props.children.ual)
                    .then(res => {
                        console.log(res)
                        //console.log('создание юзера')
                        loop()
                    })
            } catch (error) {
                //dispatch(setError({isError: true, message: error.message}))
                setTimeout(loop, 1000)
            }
            return
            //}
            // if user exist do user init

        }
        loop()
    }


    useEffect(() => {
        fetchUserData()
        console.log('request')
    }, [])


    return (
        <div>
            <h1>{activeUser}</h1>
        </div>
    );
};

export default Game;