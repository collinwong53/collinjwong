function spiral(num){
    var counter = 1;
    var output = [];
    var right = true;
    var left = false;
    var up = false;
    var down = false;
    for(var i = 0;i<num;i++){
        output.push([]);
    }
    for(i = 0; i<num;i++){
        for(var j=0;j<num;j++){
            output[j][i] = false;
        }
    }
    i = 0;
    j = 0;
    while(counter<=num*num){
        if(right){
            if(output[j][i]===false){
                output[j][i]= counter;
                counter++;
                i++
            }//end if
            else{
                right = false;
                down = true;
                j++;
                i--;
            }//end else
        }//end right
        else if(down){
            if(output[j][i]===false){
                output[j][i] = counter;
                counter++;
                if(j===num-1||output[j+1][i]!==false){
                    continue;
                }
                else{
                    j++;
                }
            }//end if
            else{
                down = false;
                left = true;
                i--;
            }//end else
        }//end if down
        else if(left){
            if(output[j][i]===false){
                output[j][i] = counter;
                counter++;
                if(i===0||output[j][i-1]!==false){
                    continue;
                }
                else {
                    i--;
                }
            }//end if
            else{
                left = false;
                up = true;
                j--;
            }//end else
        }//end left
        else if(up){
            if(output[j][i]===false){
                output[j][i] = counter;
                j--;
                counter++;
            }//end if
            else{
                up = false;
                right = true;
                j++;
                i++;
            }//end else
        }//end up
    }//end while
    for(i = 0; i<output.length;i++){
        console.log(output[i].join());
    }
}//end function


spiral(5);