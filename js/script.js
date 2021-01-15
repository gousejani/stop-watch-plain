document.addEventListener("DOMContentLoaded",
	function (event){




		var timer, timerStatus = false;
		var lapCount = 0;
		var ms, s, m, h, d1, d2, d3, d4;
		var startButton = document.getElementById("start");
		var stopButton = document.getElementById("stop");
		var lapButton = document.getElementById("lap");
		var resetButton = document.getElementById("reset");
		startButton.onclick = startTimer;
		stopButton.onclick = stopTimer;
		lapButton.onclick = lapTimer;
		resetButton.onclick = resetTimer;

		function zeroPad(num,size){
			num = num.toString();
		    while (num.length < size) num = "0" + num;
		    return num;
		}
		function getTimeDiff(t2,t1){
			var timeDiff={};
			timeDiff.s = zeroPad(Math.floor(((t2-t1)%60000)/1000),2);
			timeDiff.m = zeroPad(Math.floor((t2-t1)/60000),2);
			timeDiff.ms = zeroPad((t2-t1)%1000,3).slice(0,2);
			return timeDiff;
		}
		function startTimer() {
			if (timerStatus == false){
				document.getElementById("lap-section").innerHTML="";
				lapCount =0;
				d1 = new Date();
				timer = setInterval(function(){
					timerStatus = true;
					d2 = new Date();
					let t =  getTimeDiff(d2,d1);
					// console.log(t.m+":"+t.s+":" + t.ms);
					document.getElementById("screen").textContent = t.m+":"+t.s+":" + t.ms;
				}, 120);
			} 
		}

		function stopTimer(){
			if(timerStatus == true){
				timerStatus = false;
				d2 = new Date();
				clearInterval(timer);
				let t =  getTimeDiff(d2,d1);
				d1 = "";
				document.getElementById("screen").textContent = t.m+":"+t.s+":" + t.ms;
			}
		}

		function lapTimer(){
			if(timerStatus == true){
				if(lapCount == 0){
					d4 = new Date();
					var t =  getTimeDiff(d4,d1);
					d3 = d4;
					lapCount++;
				}else{
					d4 = new Date();
					var t =  getTimeDiff(d4,d3);
					d3 = d4;
					// document.getElementById("lap-section").innerHTML 
					// += `<div class="laps" id="laps"><div>Lap ${lapCount}</div><div>${t.m}:${t.s}:${t.ms}</div></div>`;
					lapCount++;
				}

				// let lapDivCount = document.createElement('div');
				// lapDivCount.textContent = `LAP ${lapCount}`;

				// let lapDivTimer = document.createElement('div');
				// lapDivTimer.textContent = `${t.m}:${t.s}:${t.ms}`;

				// let lapDiv = document.createElement('div');
				// lapDiv.className = "laps";
				// lapDiv.id = "laps";

				// lapDiv.innerHTML = lapDivCount.innerHTML;
				// lapDiv.innerHTML += lapDivTimer.innerHTML;


				// document.getElementById("lap-section").innerHTML 
				// 	+= lapDiv.innerHTML;

				// console.log(document.getElementById("lap-section").innerHTML)
				document.getElementById("lap-section").innerHTML 
					+= `<div class="laps" id="laps"><div>LAP ${lapCount}</div><div>${t.m}:${t.s}:${t.ms}</div></div>`;
			}
			
		}

		function resetTimer(){
			if(true){
				document.getElementById("lap-section").innerHTML="";
				lapCount =0;
				document.getElementById("screen").textContent = "00:00:00";
				clearInterval(timer);
				timerStatus = false;
			}
		}
	}
);
