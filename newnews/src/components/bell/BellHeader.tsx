import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { IoIosArrowBack } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

import Modal from "@/components/bell/Modal";
import useAlertList from "@/hooks/bell/useBellList";
import useBellDelete from "@/hooks/bell/useBellDelete";
import { LoginState } from "@/states/LoginState";

import styles from "@/styles/bell/BellHeader.module.scss";



/**
 * 
 * @returns 알림창 맨 상단 바
 */
export function BellHeader(){
    const navigate = useNavigate()
    
    const [isOpenModal, setOpenModal] = useState<boolean>(false);
    const BellDelete = useBellDelete()
    
    /**
     * 알림 전체 삭제
     */
    const onClcikDeleteBell = () =>{
        console.log(BellDelete.mutate({ userId: 1 },{
            onError : (err) => {
                console.log(err)
            }
        }))
    }

    /**
     * 모달창을 열고 닫고
     */
    const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
    }, [isOpenModal]);

    /**
     * 페이지 뒤로가기
     */
    function goBack() {
        navigate(-1)
    }

    return (
    <div className={styles.container} >
        <div className={styles.bellBar}>
            <IoIosArrowBack className={styles.goBack} onClick={ goBack }/>
            <div className={styles.alert}>
                <h2>알림센터</h2>
            </div>
            {isOpenModal && ( 
            <Modal onClickChoice={ onClcikDeleteBell } onClickToggleModal={ onClickToggleModal } children={"알림을 전체 삭제 하시겠습니까?"} />
            )}
            <RiDeleteBin6Line className={styles.deleteAlret} onClick={ onClickToggleModal }/>
        </div>
    </div>
    )
}