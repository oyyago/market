import React from 'react'
import { Background,ModalContainer } from './styled'

export  function Modal({ isOpen, setModalOpen, children }) {
  if (isOpen) {
    return (
      <Background>
        <ModalContainer>
          <div>{children}</div>
        </ModalContainer>
      </Background>
    )
  }

  return null
}
