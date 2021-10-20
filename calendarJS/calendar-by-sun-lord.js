		//Begin
		var dateNow = new Date();
		var dateNumber,monthNumber,dayNumber,yearNumber;
		var monthBase=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var monthBaseVN=['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
		var dayBase=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		var dataDate;
		var dataAlert;
		//-- Định dạng loại dữ liệu
		class templatePracticing{
			///////////////////////////////////////
			//Lớp định nghĩa mẫu giờ tập cho sân tập, chủ sân sẽ định nghĩa ra mẫu giờ tập, người quản lý sân sẽ đưa vào thông tin giờ tập sau
			//id - ID của mẫu giờ tập cho sân tập
			//name - Tên mẫu giờ tập
			//from - Thời gian bắt đầu của giờ tập
			//to - Thời gian kết thúc của giờ tập
			//price - Giá tiền của giờ tập
			///////////////////////////////////////
			 constructor(id,name,from,to,price) {
			    this.id= id;
			    this.name=name;
				this.from= from; 
			    this.to = to;
			    this.price = price;
		  	}
		}
		class Practicing{
			///////////////////////////////////////
			//Lớp định nghĩa thông tin của giờ tập, người quản lý sẽ thực hiện điền hông tin giờ tập tại đây
			//id - ID của giờ tập
			//idTemplatePracticing - Mẫu giờ tập (từ đây lấy ra được toàn bộ thông tin mẫu tập đó)
			//title - tiêu đề của sân tập
			//notes - ghi chú của sân tập
			///////////////////////////////////////
			 constructor(id,idTemplatePracticing,date,title,status,notes) {
			    this.id= id;
				this.idTemplatePracticing= idTemplatePracticing; 
				this.date= date;
			    this.title = title;
			    this.status = status;
			    this.notes=notes;
		  	}
		}
		//practicingField 
		//-- Giờ tập
		class hourPracticing {
		  constructor(id,id_date,name,desc,hourStart,hourEnd,type) {
		    this.id   = id;
			this.id_date= id_date;
		    this.name = name;
		    this.desc = desc;
		    this.hourStart = hourStart;
		    this.hourEnd= hourEnd;
		    this.type = type;//const or not const 
		  }
		}
		//-- Ngày có giờ tập tập
		class datePracticing{
			constructor(id,date,hourPracticings){
				this.id=id;
				this.date=date;
			}
		}

		// Dữ liệu ở đây :)) , có thể dùng ajax lấy về hoặc gì cũng đc...
		storeTemplatePracticing=[
		new templatePracticing(1,"Loại giờ tập 1","8:00","10:00",300000),
		new templatePracticing(2,"Loại giờ tập 2","10:15","12:15",200000),
		new templatePracticing(3,"Loại giờ tập 3","12:30","14:30",300000),
		];
		storePracticing=[
		 new Practicing(1,1,"2018-04-25","Đại học kiến trúc","Cố định","Giờ học môn bóng rổ"),
		 new Practicing(2,1,"2018-04-26","Đại học bách khoa","Không cố định","Giờ tập bóng rổ"),
		 new Practicing(3,2,"2018-04-25","Đại học fpt","Không cố định","Giờ tập bóng rổ"),
		 new Practicing(4,2,"2018-04-26","Đại học bưu chính","Không cố định","Giờ tập bóng rổ"),
		 new Practicing(5,3,"2018-04-25","Đại học thăng long","Không cố định","Giờ tập bóng rổ"),
		]

		storeDatePracticing= [
		new datePracticing(1,"2018-03-15"),
		new datePracticing(2,"2018-03-16")
		]
		console.log(storeDatePracticing);
		storeHourPracticing= [
		new hourPracticing(1,1,'DH kiến trúc','Giờ cố định , học môn bóng rổ','8:00:00','10:00:00','1'),
		new hourPracticing(1,1,'DH kiến trúc','Giờ cố định , học môn bóng rổ','8:00:00','10:00:00','1'),
		new hourPracticing(1,2,'DH kiến trúc','Giờ cố định , học môn bóng rổ','8:00:00','10:00:00','2')
		]


		
		
		function update(){
			//Update status now
			dateNumber=dateNow.getDate();
			monthNumber = dateNow.getMonth();
			dayNumber = dateNow.getDay();
			yearNumber = dateNow.getFullYear();
			// =========================================================================
			//Đẩy tháng và năm ra màn hình
			document.getElementById("month").innerHTML=monthBaseVN[monthNumber];
			document.getElementById("month").setAttribute("data-month", monthNumber);
			document.getElementById("year").innerHTML="Năm "+yearNumber;
			document.getElementById("year").setAttribute("data-year", yearNumber);

			//Lấy ra ngày đầu tiên của tháng và ngày cuối cùng của tháng
			//Get First Day and Last Day of Month
			let firstDate= new Date(dateNow.getFullYear(), dateNow.getMonth() , 1);
			let lastDate= new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0);
			// =========================================================================
				
			//Generation Days in Calendar to view
			//getDay lấy ra ngày thứ mấy trong tuần, từ đó lặp tạo ra ngày trống trong lịch
				//--Push day in week is empty 
					let elementFirst='';
					let elementLast='';
					for (let i=0; i < firstDate.getDay(); i++) {
						elementFirst+="<li></li>";
					}
				//--====================================================================
				//--monthText for '01', '02' and monthNumber is 0-11 , need +1 to real month
					let monthText;	
					if (monthNumber<10) {
						monthText=monthNumber+1;
						monthText="0"+monthText;
					}else{
						monthText=monthNumber+1;
					}
				//--====================================================================
				//--Push day is date, active or not active...
				console.log(storePracticing);
				for (let i=1; i <= lastDate.getDate(); i++) {
					//dataDate dùng để so sánh với dữ liệu thật để đưa ra button nào có dữ liệu hiển thị active
					if (i<10) {
						dataDate=yearNumber+"-"+monthText+"-0"+i;
					}else{
						dataDate=yearNumber+"-"+monthText+"-"+i;
					}
					dataAlert="select";	
					for (let pract of storePracticing) {
						   if (dataDate==pract.date) {
							  	dataAlert="select active";	
							  	break;
						   }
					}
					elementLast+="<li class=\"day\" >"+"<button class=\""+dataAlert+"\" data-date=\""+dataDate+"\">"+i+"</button>"+"</li>";

				
				}
				// document.getElementById("dateInMonth").innerHTML=lastDate.getDate()+'Day in Month';
			// =========================================================================
			//Push list data date
			document.getElementById("days").innerHTML=elementFirst+elementLast;
			let selected = document.getElementsByClassName("select");
			var getInfo = function() {

			    let dataDate = this.getAttribute("data-date");
			    document.getElementById("select-date").innerHTML=dataDate;
			    for (let datePract of storeDatePracticing) {
			    	if (dataDate==datePract.date) {
				  		const result = storeHourPracticing.filter(hourPract => hourPract.id_date==datePract.id)
				  		alert(datePract.date +' - Tên : ' +result[0].name+' Desc '+result[0].desc)
				  		console.log(result);

			    	}
				}
			};

			for (var i = 0; i < selected.length; i++) {
			    selected[i].addEventListener('click', getInfo, false);
			}


		}
		update();
		if (monthNumber<10) {
						monthText=monthNumber+1;
						monthText="0"+monthText;
					}else{
						monthText=monthNumber+1;
					}
		if (dateNumber<10) {
						document.getElementById("select-date").innerHTML=yearNumber+"-"+monthText+"-0"+dateNumber;
					}else{
						document.getElementById("select-date").innerHTML=yearNumber+"-"+monthText+"-"+dateNumber;
					}

		var dateBase;
		//End Begin
		//Action when prev month
		document.getElementById("prev").addEventListener("click", function(){
			monthNumber--;
			dateNow.setMonth(monthNumber);
			update();
		});
		//Action when next month
		document.getElementById("next").addEventListener("click", function(){
			monthNumber++;
			dateNow.setMonth(monthNumber);
			update();
		});
		

		

