class TicTacToe {
    constructor(){
        this.gameBoard = [["00","01","02"],["10","11","12"],["20","21","22"]];
        this.plays = 0;
        this.computer = new Computer();
    }
    makeHumanPlay(id){
        let i = Number(id.charAt(0));
        let j = Number(id.charAt(1));
        if(this.gameBoard[i][j] != "O" && this.gameBoard[i][j] != "X"){
            this.gameBoard[i][j] = "X";
            document.getElementById(id).textContent ="X";
            this.plays++;
            if(this.plays == 9){
                this.computer.endGame();
            }
            this.computerPlay();
        }
    }
    computerPlay(){
        this.gameBoard = [...this.computer.computerPlay(this.gameBoard, this.plays)];
        this.plays++;
    }
    
}

class Computer{
    constructor(){
        this.gameBoard = [["00","01","02"],["10","11","12"],["20","21","22"]];
        this.plays = 0;
    }
    endGame(win){
        const buttons = document.querySelectorAll("button");
        
        for(button of buttons){
            button.disabled = "true";
        }
        let div = document.createElement("div");
        let h1 = document.createElement("h1");

        
        if(win){
            h1.textContent = "You win :)";
            
        }
        else if(win == false){
            h1.textContent = "you loose :)";
        }
        else{
            h1.textContent = "Draw :(";
        }

        div.appendChild(h1);
        document.getElementById("game-wrapper").append(div);
        
    }
    checkWin(win){
        if(this.checkColumn()|| this.checkDiagonal()|| this.checkRow()){
            this.endGame(win);
            return true;
        }
        return false;
        
    }
    computerPlay(gameBoard, plays){
        this.plays = plays;
        this.gameBoard = gameBoard
        let computerPlays = this.plays;

        if(this.checkWin(true)){
            return this.gameBoard;
        }

        let column = this.columnWin();
        let row = this.rowWin();
        let diagonal = this.diagonalWin();
        if (computerPlays < this.plays){
            return this.gameBoard;
        }

        let iterator = [column,row,diagonal]
        for(let i = 0; i <iterator.length; i++){
            console.log(iterator[i][0]);
            if(iterator[i][0] == "X"){
                let id = iterator[i][1];
                document.getElementById(id).textContent = "O";
                let index = Number(id.charAt(0));
                let j = Number(id.charAt(1));
                this.gameBoard[index][j] = "O";
                this.plays++; 
                this.checkWin(false);
                return this.gameBoard;
            }
        }
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(this.gameBoard[i][j] != "O" && this.gameBoard[i][j] != "X"){
                    this.gameBoard[i][j] = "O";
                    let id = i.toString() + j.toString();
                    document.getElementById(id).textContent = "O";
                    this.plays++;
                    this.checkWin(false);
                    return this.gameBoard;
                }
            }
            
        }

        
    }

    columnWin(){
        let returner = ["N"];
        for(let i = 0; i < this.gameBoard.length;i++){
            let xMatches = 0;
            let oMatches = 0;
            let position = -1;

            for(let j = 0; j <this.gameBoard[i].length; j++){
                if(this.gameBoard[i][j] == "X"){
                    xMatches++;
                }
                else if(this.gameBoard[i][j] == "O"){
                    oMatches++;
                }
                else{
                    position = j;
                }
            }
            if(oMatches == 2 && position != -1){
                returner[0] = ["O"]
                this.gameBoard[i][position] = "O";
                let id = i.toString() + position.toString();
                document.getElementById(id).textContent = "O";
                returner.push(id);
                this.plays++;
                let test = this.checkWin(false);
                return returner;
            }

            if(xMatches == 2 && position != -1){
                returner[0] = ["X"];
                let id = i.toString() + position.toString();
                returner.push(id);
                return returner;
            }
        
        } 
        return returner;
    }

    rowWin(){
        let returner = ["N"];
        for(let i = 0; i < 3;i++){
            let xMatches = 0;
            let oMatches = 0;
            let position = -1;
            for(let j = 0; j < 3; j++){
                if(this.gameBoard[j][i] == "X"){
                    xMatches++;
                }
                else if(this.gameBoard[j][i] == "O"){
                    oMatches++;
                }
                else{
                    position = j;
                }
        }
            if(oMatches ==2 && position != -1){
                returner[0] = ["O"]
                this.gameBoard[position][i] = "O"
                let id = position.toString() + i.toString();
                document.getElementById(id).textContent = "O";
                returner.push(id);
                this.plays++;
                let test = this.checkWin(false);
                return returner;
            }

            if(xMatches == 2 && position != -1){
                returner[0] = ["X"];
                let id = position.toString() + i.toString();
                returner.push(id);
                return returner;
            }
        }
        return returner;
    }

    diagonalWin(){
        let returner = ["N"];
        let xMatches = 0;
        let oMatches = 0;
        let position = -1;
        let leftArray = [["02",this.gameBoard[0][2]],["11",this.gameBoard[1][1]],["20",this.gameBoard[2][0]]];
        let i = 0;
        for(let i =0; i < 3;i++){
            if(this.gameBoard[i][i] == "X"){
                xMatches++;
                continue;
            }
            else if(this.gameBoard[i][i] == "O"){
                oMatches++;
                continue;
            }
            else{
                position = i;
                
            }  
            
        }
        if(oMatches == 2 && position != -1){
            returner[0] = ["O"]
            this.gameBoard[position][position] = "O"
            let id = position.toString() + position.toString();
            document.getElementById(id).textContent = "O";
            returner.push(id);
            this.plays++;
            let test = this.checkWin(false);;
            return returner;
        }

        if(xMatches == 2 && position != -1){
            returner[0] = "X";
            let id = position.toString() + position.toString();
            returner.push(id);
            return returner;
        }
        xMatches = 0;
        oMatches = 0;
        position = -1;

        for(let i = 0; i <3; i++){
            if(leftArray[i][1] == "X"){
                xMatches++;
                continue;
            }
            else if(leftArray[i][1] == "O"){
                oMatches++;
                continue;
            }
            else{
                position = i;
            }  
        }

        if(oMatches == 2 && position != -1){
            returner[0] = ["O"];
            this.gameBoard[1][position] = "O";
            let id = leftArray[position][0];
            document.getElementById(id).textContent = "O";
            returner.push(id);
            this.plays++;
            let test = this.checkWin(false);
            return returner;
        }

        if(xMatches == 2 && position != -1){
            returner[0] = "X";
            let id = leftArray[position][0];
            returner.push(id);
            return returner;
        }
        return returner;
        

    }

    checkColumn(){
        for(let i = 0; i < this.gameBoard.length;i++){
            let player = this.gameBoard[i][0];
            let win = true;
            for(let j = 0; j <this.gameBoard[i].length; j++){
                if(player != this.gameBoard[i][j]){
                    win = false;
                    break;
                }
            }
            if(win){
                return win;
            }
        }
        return false;
    }
    checkRow(){
        for(let i = 0; i < 3;i++){
            let player = this.gameBoard[0][i];
            let win = true;
            for(let j = 0; j < 3; j++){
                if(player != this.gameBoard[j][i]){
                    win = false;
                    break;
                }
            }
            if(win){
                return win;
            }
        }
        return false;
    }
    checkDiagonal(){
        let player = this.gameBoard[1][1];
        if(player == this.gameBoard[0][0]){
            if(player == this.gameBoard[2][2]){
                return true;
            }
        }
        if(player == this.gameBoard[0][2]){
            if(player == this.gameBoard[2][0]){
                return true;
            }
        }
        return false;
    }
}

let ticTac = new TicTacToe();

const buttons = document.querySelectorAll("button");
for (button of buttons){
    button.addEventListener("click", e=>{
        let id = e.target.id;
        ticTac.makeHumanPlay(id);
    })
}