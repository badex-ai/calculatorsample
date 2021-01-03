//-----------------UI Controller
let UIcontroller = (function(){
    let domStrings = {
        historyOutput: ".calc-output__text",
        mainOutput: ".calc-output__output-resultTxt",
        numbersBtn:"button button__left",
        arithmeticBtn:"button button__right",
        equalBtn:".button__equal",
        clearBtn:".clear",
        deleteBtn:".del",
        leftBraBtn:".btn__leftbra",
        rightBraBtn:".btn__rightbra",
        moveLeftBtn : ".dir__left",
        moveRightBtn: ".dir__right"

    }
    
    return {
        
        getDomStrings:function(){
          return domStrings;
          
        },
        getHistory:function(){
          return  document.querySelector(domStrings.historyOutput).innerText;
        },
        updateHistory:function(value){
          // document.querySelector(domStrings.historyOutput).innerText= value;



           if(document.querySelector(domStrings.historyOutput).innerText===""){
              document.querySelector(domStrings.historyOutput).innerText= value
            }
            else document.querySelector(domStrings.historyOutput).innerText += value;
        
        },

        clearMemory: function(){
          document.querySelector(domStrings.historyOutput).innerText=" ";
           document.querySelector(domStrings.mainOutput).innerText="0"
           
         },
        
        displayOutput: function(val){
          return document.querySelector(domStrings.mainOutput).textContent=val;
        },
        moveInputLeft(){
          let outputFrame = document.querySelector(domStrings.historyOutput);
          console.log('pressed')
          outputFrame.style.transform = 'translateX(10px)'
        },
        moveInputRight(){
          let outputFrame = document.querySelector(domStrings.historyOutput);
          console.log('pressed')
          outputFrame.style.transform = 'translateX(-10px)'
        }
        

    }

})()

//-------------Calc controller
let calcController=(function(){
 


    return{

     
      fmatHistOutputtoStr: function(val){
       
       
        valabs= Math.abs(val);
        valf= valabs.toFixed(2);
        let  valstr = valf.toString();
         let numSplit = valstr.split('.');
             int= numSplit[0];
             if(int.length<=3){int}
             else if(int.length <= 6){
               int = int.substr(0,int.length-3) + "," + int.substr(int.length-3,3)
           }
             else if(int.length <= 9){
               int = int.substr(0,int.length-6) + "," + int.substr(int.length-6,3) + "," + int.substr(int.length-3,3)
           }
           else if(int.length <= 12){
             int = int.substr(0,int.length-9) + "," + int.substr(int.length-9,3) + "," + int.substr(int.length-6,3)+"," + int.substr(int.length-3,3)
         }
         else if(int.length <= 15){
           int = int.substr(0,int.length-12) + "," + int.substr(int.length-12,3) + "," + int.substr(int.length-9,3)+"," + int.substr(int.length-6,3)+"," + int.substr(int.length-3,3)
       }else if(int.length <= 18){
         int = int.substr(0,int.length-15) + "," + int.substr(int.length-15,3) + "," + int.substr(int.length-12,3)+ "," + int.substr(int.length-9,3)+"," + int.substr(int.length-6,3)+"," + int.substr(int.length-3,3)
     }
         ;
             dec= numSplit[1];
             
            ;
            if(val<0){
           return '-' + int + '.' + dec
       }
       else return int + '.' + dec
       
       
      },
      deleteNumber: function(his){
       return his.slice(0,his.length-1)
      },
      calculateOutput: function(val){
        return eval(val)
      },

    }

})()

//-------------App controller
let controller= (function(UIctrl,calcCtrl){
    let numbers,mthSymb,equal,DOMStrings,clearMemory,deleteNum,leftbra,rightbra;

    DOMStrings = UIctrl.getDomStrings();
   
    //-------------event handler for numbers
    numbers = document.getElementsByClassName(DOMStrings.numbersBtn);

    for(let i=0; i<numbers.length;i++){
      numbers[i].addEventListener('click', function()
    {let inputnumber = this.id;
    console.log(inputnumber);

    

    //update history
    UIctrl.updateHistory(inputnumber);
    //unformat history

    
      }
    )
  }

  //-------------event handler for clearing memory
  clearMemory = document.querySelector(DOMStrings.clearBtn);
  clearMemory.addEventListener('click', function(){
    UIctrl.clearMemory()
  });




    //-------------event handler for math Operations
    mthSymb = document.getElementsByClassName(DOMStrings.arithmeticBtn);
    
    for(let i=0; i<mthSymb.length;i++){
        mthSymb[i].addEventListener('click', function()
      {let inputOperator = this.id;
      console.log(inputOperator);

      

      //update history
      UIctrl.updateHistory(inputOperator);
      //unformat history


        }
      )
    };
    //-------------event handler for leftbra
    leftbra = document.querySelector(DOMStrings.leftBraBtn);

    leftbra.addEventListener('click', function()
    {
      let output =this.id;
      UIctrl.updateHistory(output);

    });

    //-------------event handler for rightbra
    rightbra = document.querySelector(DOMStrings.rightBraBtn);

    rightbra.addEventListener('click', function()
    {
      let output =this.id;
      UIctrl.updateHistory(output);

    });


    //-------------event handler for equalto
    equal = document.querySelector(DOMStrings.equalBtn);

    equal.addEventListener('click', function()
    {
      let output = UIctrl.getHistory();
      
    finalOutput = calcCtrl.calculateOutput(output);

    //convert to output format
    finalOutput = calcCtrl.fmatHistOutputtoStr(finalOutput);
    //print output
      UIctrl.displayOutput(finalOutput)
    }
    );

    //Deleting 
    deleteNum= document.querySelector(DOMStrings.deleteBtn);
    deleteNum.addEventListener('click', function()
    {
      //get history
      let output = UIctrl.getHistory();

      //delete item
      output = calcCtrl.deleteNumber(output);
      UIctrl.clearMemory();
      //updateHistory
      UIctrl.updateHistory(output)
    })


    //Event Handler For Scrolling left or Right
      moveSmall = document.querySelector(DOMStrings.moveLeftBtn);
      moveSmall.addEventListener('click',function(){
        console.log('start')
        UIcontroller.moveInputLeft()
      })

      moveSmall = document.querySelector(DOMStrings.moveRightBtn);
      moveSmall.addEventListener('click',function(){
        console.log('start')
        UIcontroller.moveInputRight()
      })


}
   

   

    

    
)(UIcontroller, calcController)
