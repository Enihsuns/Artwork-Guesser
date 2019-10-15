import React from "react";
import { render } from "react-dom";
import Modal from "react-responsive-modal";
import Button from '@material-ui/core/Button';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  position: 'relative',
  display: 'block',
  marginTop: 20,
  marginLeft: 'auto',
  marginRight: 'auto',
};



export default class Score extends React.Component {
    state = {
        open: false
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        return (
        <div style={styles} >
            <Button onClick={this.onOpenModal} variant="outlined" >Guess</Button>
            <Modal open={open} onClose={this.onCloseModal}>
            <h2>Score</h2>
            <p>Score is .........</p>
            <Button variant="outlined">next</Button>
            </Modal>
        </div>
        );
    }
}

//export default Score;
//render(<Score />, document.getElementById("root"));