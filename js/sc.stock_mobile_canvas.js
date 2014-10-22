/*
 * Package: ChartCandlestick
 * Version: 0.02 (2012-03-16)
 * Author:  hitsubunnu
 */

function ChartCandlestick(options) {
	this.id		 = options['id'];
	this.width	 = options['width'] || 960;
	this.height	 = options['height'] || 480;
	
	this.title	 = options['title'];
	this.fx	 	 = options['fx'];
	this.ll		 = options['label_left'];
	this.lb 	 = options['label_bottom'];
	this.data	 = options['data'];
	this.average = options['average'];
	this.volume  = options['volume'];

	this.ratio	 = options['ratio'] || 0.8;
	this.digit   = options['digit'] || 3;
	this.zoom	 = options['zoom'] || this.width/960;
}

ChartCandlestick.prototype.draw = function() {
	var W = this.width;
	var H = this.height;
	var R = this.ratio;
	var Z = this.zoom;
	var ll = this.ll;
	var lb = this.lb;
	var title = this.title;
	var fx = this.fx;
	var average = this.average;
	var volume = this.volume;
	var data = this.data;
	var digit = this.digit;
	var w = R * W;
	var h = R * H * 0.8;
	var h_v = R * H * 0.2;
	var x0 = (1-R)/2*W;
	var y0 = (1-R)/2*H;
	ll.max = Number(ll.max);
	ll.min = Number(ll.min);
	var height = ll.max - ll.min;
	var hh = y0+h*1.05; 
	if(!volume){
	   	h_v = 0;
		hh = y0+h;
	}

	var stage = new Kinetic.Stage({container: this.id,width: W,height: H});

	var	layer_label 	= new Kinetic.Layer();
	var	layer_lr 		= new Kinetic.Layer();
	var	layer_backdrop 	= new Kinetic.Layer();
	var	layer_avg 		= new Kinetic.Layer();
	var	layer_graphic 	= new Kinetic.Layer();
	var	layer_opacity 	= new Kinetic.Layer();
	var	layer_line 		= new Kinetic.Layer;
	var	group_lines 	= new Kinetic.Group;
	layer_line.add( group_lines )

	// init
	var fonts = ['MS Gothic','sans-serif'];
	if(!average[0].color) average[0].color = "#0099c5";
	if(!average[1].color) average[1].color = "#ff9900";

	// label top (title)
	layer_label.add( new Kinetic.Text( {x: x0,y: y0/2,text:title.string,width: w,align: 'center',fill: 'brown','fontSize': 16*Z,'fontStyle':'bold',fontFamily:fonts}) );

	// label left
	for(var i=0;i<=ll.cali;i++){
		var y   = y0 + h * (ll.cali - i) / ll.cali - 6*Z;
		var txt = (ll.min+(ll.max-ll.min)/ll.cali*i).toFixed(digit).replace(/^([+-]?\d+)(\d\d\d)/,"$1,$2");
		layer_label.add( new Kinetic.Text({x:0,y:y,text: txt,width: x0-6*Z,'align':"right",fill:'gray','fontSize': 12*Z,fontFamily:fonts}) );
	}
	
	// label right
	var lr_x = x0+w+6*Z
	// open
	layer_label.add( new Kinetic.Rect({ x: lr_x,		y: y0,		 width: 12*Z, height: 12*Z ,fill: '#3366CC' }) )
	layer_label.add( new Kinetic.Text({ x: lr_x+16*Z,	y: y0, 		 text: '始値', fill: '#3366CC',fontSize: 12*Z, align: 'left','fontStyle':'bold','fontFamily':fonts}) );
	var lr_open    = new Kinetic.Text({ x: lr_x, 		y: y0+20*Z,  width: x0-12*Z,align: 'left', text: ' ', fill: '#3366CC',fontSize: 12*Z,'fontStyle':'bold','fontFamily':fonts})
	layer_lr.add( lr_open )
	// high
	layer_label.add( new Kinetic.Rect({ x: lr_x,		y: y0+20*Z*2, width: 12*Z, height: 12*Z ,fill: '#3366CC' }) )
	layer_label.add( new Kinetic.Text({ x: lr_x+16*Z, 	y: y0+20*Z*2, text: '高値', fill: '#3366CC',fontSize: 12*Z, align: 'left','fontStyle':'bold','fontFamily':fonts}) );
	var lr_high    = new Kinetic.Text({ x: lr_x, 		y: y0+20*Z*3, width: x0-12*Z,align: 'left', text: ' ', fill: '#3366CC',fontSize: 12*Z,'fontStyle':'bold','fontFamily':fonts})
	layer_lr.add( lr_high )
	// low 
	layer_label.add( new Kinetic.Rect({ x: lr_x,		y: y0+20*Z*4, width: 12*Z, height: 12*Z ,fill: '#3366CC' }) )
	layer_label.add( new Kinetic.Text({ x: lr_x+16*Z, 	y: y0+20*Z*4, text: '安値', fill: '#3366CC',fontSize: 12*Z, align: 'left','fontStyle':'bold','fontFamily':fonts}) );
	var lr_low     = new Kinetic.Text({ x: lr_x, 		y: y0+20*Z*5, width: x0-12*Z,align: 'left', text: ' ', fill: '#3366CC',fontSize: 12*Z,'fontStyle':'bold','fontFamily':fonts})
	layer_lr.add( lr_low )
	// close
	layer_label.add( new Kinetic.Rect({ x: lr_x,		y: y0+20*Z*6, width: 12*Z, height: 12*Z ,fill: '#3366CC' }) )
	layer_label.add( new Kinetic.Text({ x: lr_x+16*Z, 	y: y0+20*Z*6, text: '終値', fill: '#3366CC',fontSize: 12*Z, align: 'left','fontStyle':'bold','fontFamily':fonts}) );
	var lr_close   = new Kinetic.Text({ x: lr_x, 		y: y0+20*Z*7, width: x0-12*Z,align: 'left', text: ' ', fill: '#3366CC',fontSize: 12*Z,'fontStyle':'bold','fontFamily':fonts})
	layer_lr.add( lr_close )
	// volume 
	layer_label.add( new Kinetic.Rect({ x: lr_x,		y: y0+20*Z*8, width: 12*Z, height: 12*Z ,fill: '#3366CC' }) )
	layer_label.add( new Kinetic.Text({ x: lr_x+16*Z, 	y: y0+20*Z*8, text: '出来高', fill: '#3366CC',fontSize: 12*Z, align: 'left','fontStyle':'bold','fontFamily':fonts}) );
	var lr_volume  = new Kinetic.Text({ x: lr_x, 		y: y0+20*Z*9, width: x0-12*Z,align: 'left', text: ' ', fill: '#3366CC',fontSize: 12*Z,'fontStyle':'bold','fontFamily':fonts})
	layer_lr.add( lr_volume )
	// avg0
	layer_label.add( new Kinetic.Rect({ x: lr_x,		y: y0+20*Z*10, width: 12*Z, height: 12*Z ,fill: average[0].color }) )
	layer_label.add( new Kinetic.Text({ x: lr_x+16*Z, 	y: y0+20*Z*10, text: average[0].string, fill: average[0].color,fontSize: 12*Z, align: 'left','fontStyle':'bold','fontFamily':fonts}) );
	var lr_avg0    = new Kinetic.Text({ x: lr_x, 		y: y0+20*Z*11, width: x0-12*Z,align: 'left', text: ' ', fill: average[0].color,fontSize: 12*Z,'fontStyle':'bold','fontFamily':fonts})
	layer_lr.add( lr_avg0 )
	// avg1
	layer_label.add( new Kinetic.Rect({ x: lr_x,		y: y0+20*Z*12, width: 12*Z, height: 12*Z ,fill: average[1].color }) )
	layer_label.add( new Kinetic.Text({ x: lr_x+16*Z, 	y: y0+20*Z*12, text: average[1].string, fill: average[1].color,fontSize: 12*Z, align: 'left','fontStyle':'bold','fontFamily':fonts}) );
	var lr_avg1    = new Kinetic.Text({ x: lr_x, 		y: y0+20*Z*13, width: x0-12*Z,align: 'left', text: ' ', fill: average[1].color,fontSize: 12*Z,'fontStyle':'bold','fontFamily':fonts})
	layer_lr.add( lr_avg1 )
	// date
	layer_label.add( new Kinetic.Rect({ x: lr_x,		y: y0+20*Z*14, width: 12*Z, height: 12*Z ,fill: '#CC0000' }) )
	layer_label.add( new Kinetic.Text({ x: lr_x+16*Z, 	y: y0+20*Z*14, text: '日付', fill: '#CC0000',fontSize: 12*Z, align: 'left','fontStyle':'bold','fontFamily':fonts}) );
	var lr_date    = new Kinetic.Text({ x: lr_x, 		y: y0+20*Z*15, width: x0-12*Z,align: 'left', text: ' ', fill: '#CC0000',fontSize: 10*Z, 'fontStyle':'bold','fontFamily':fonts})
	layer_lr.add( lr_date )
	// fx
	if(fx){
		layer_label.add( new Kinetic.Text({ x: 0, y: hh,text: "取引通貨:"+fx,width: x0-6*Z,align: 'left',fill: 'gray','fontSize': 10*Z}) );
	}

	// label bottom
	var lb_y = ( volume ) ? 1.5 * y0 + h + h_v : 1.5 * y0 + h ;
	if(lb.length > 1){
		for(var i= 0;i<lb.length;i++){
			var x = x0 + w / (lb.length-1) * i; 
			layer_label.add( new Kinetic.Text({x: x-50*Z,y:lb_y,text: lb[i],'fontSize': 12*Z,fill: 'gray','fontFamily':fonts}) );
		}
	}
	
	// backdrop
	for(var i=0;i<=ll.cali;i++){
		var x = x0 + w;
		var y = y0 + h * i / ll.cali;

		layer_label.add( new Kinetic.Line({ points: [x0,y,x,y],"stroke":"#ccc",'dashArray':[3,3]}) ) 
	}
	
	if(lb.length > 1){
		for(var i= 0;i<lb.length;i++){
			var x = x0 + w / (lb.length-1) * i; 
			layer_label.add( 	new Kinetic.Line({ points:[x,y0,x,y0+h],"stroke":"#ccc",'dashArray':[3,3]}) ); 
		}
	}
	
	// graphics : data 
	var cali = w / data.length;
	for(var i=0;i<data.length;i++){
		if(!data[i][0]) continue; 	
		(function(){
			var date  = data[i][0];
			var	open  = Number(data[i][1]);
			var	high  = Number(data[i][2]);
			var	low   = Number(data[i][3]);
			var	close = Number(data[i][4]);
			var	avg0 = average[0].values[i];
			var	avg1 = average[1].values[i];
			var	vol  = (volume) ? volume[i] : '';

			var x = x0 + cali/2+cali*i;
			var high_y  = y0 + (ll.max - high)/height*h;
			var low_y   = y0 + (ll.max - low )/height*h;
			var open_y  = y0 + (ll.max - open)/height*h;
			var close_y = y0 + (ll.max - close)/height*h;
			var rect_h,rect_c,rect_y,rect_x=x-cali*0.4;
			if( open_y > close_y ){
				rect_c = "#FFFFFF";
				rect_h = open_y - close_y;
				rect_y = close_y;
			}else{
				rect_c = "#3366CC";
				rect_h = close_y - open_y;
				rect_y = open_y;
			}
			
			if( open == '' || high =='' || low == '' || rect_h == 0 ){ 
				rect_c = "#000000";
				rect_h = 1; 
				rect_y = close_y;
			}
				
			layer_graphic.add( new Kinetic.Path({ data: "M"+x+","+high_y+"L"+x+","+low_y,stroke: '#3366CC',shadow:{color: '#3366CC',opacity:0.5}}) );
			layer_graphic.add( new Kinetic.Rect({ x:rect_x,y:rect_y,width:cali*0.8,height:rect_h,fill: rect_c,stroke: '#3366CC',shadow:{color: '#3366CC',opacity:0.5}} ) );
			
			var red_line_g = new Kinetic.Line({ points: [x ,y0,x,y0+h],stroke:'#CC0000',opacity: 0 })
			var red_line_v = new Kinetic.Line({ points: [x ,hh,x,hh+h_v],stroke:'#CC0000',opacity: 0 })
			var red_rect   = new Kinetic.Rect({ x:x-cali,y:hh+h_v,width:cali*2,height:5*Z,fill:'#CC0000',opacity: 0 })
			
			group_lines.add( red_line_g )
			group_lines.add( red_line_v )
			group_lines.add( red_rect )

			var rect = new Kinetic.Rect( { x: x0+cali*i,y: y0,width: cali,height: h , fill: '#FFF','opacity': 0 } )

			rect.on('mouseover touchmove tap',function(){
			   	var nodes = group_lines.getChildren();
				for( var i=0; i<nodes.length;i++){
					nodes[i].setOpacity( 0 );
				}
				red_line_g.setOpacity( 1 );
				red_line_v.setOpacity( 1 );
				red_rect.setOpacity( 1 );
				
				lr_open.setText( open+"" );
				lr_high.setText( high+"" )
				lr_low.setText( low+"" )
				lr_close.setText( close+"" )
				lr_volume.setText( vol+"" )
				lr_avg0.setText( avg0+"" )
				lr_avg1.setText( avg1+"" )
				lr_date.setText( date )

				layer_line.draw()
				layer_lr.draw()
			});
			
			layer_opacity.add( rect )
		})();
	}

	// graphics : average
	for(var i=0;i<average.length;i++){
		var values = average[i]['values'];
		var path = '',
			x = '',
			y = '';

		for(var j=0;j<values.length;j++){
			if(!values[j]) continue; 	
			x = x0 + w / values.length * j + cali/2;
			y = y0 + (ll.max-values[j])/height * h ; 
			path += (path) ? "L"+x+","+y : "M"+x+","+y;
		}
		layer_avg.add( new Kinetic.Path({ data: path,"stroke":average[i]['color'] }) );
	}

	// graphic : volume
	if(volume){
		var vmax = Math.max.apply( null,volume ); 
		var vmin = Math.min.apply( null,volume );
		var v_len = vmax - vmin;
		
		// backdrop line
		layer_label.add( new Kinetic.Rect({x:x0,y: hh,width:w,height:h_v,stroke: "#ccc"}) );
		
		for(var i=1;i<=4;i++){
			var x = x0 + w;
			var y = y0 + h*1.05 + h_v * (4-i) / 4;

			layer_label.add( new Kinetic.Line({ points: [x0,y,x,y], "stroke":"#ccc",dashArray: [3,3] }) );
			layer_label.add( new Kinetic.Text({ x: lr_x, y: y-6*Z,text: ( vmax*i/4/1000 ).toFixed(digit).replace(/^([+-]?\d+)(\d\d\d)/,"$1,$2") ,'align':"left",fontSize: 12*Z,fill: 'gray',fontFamily:fonts}) );	
		}
		layer_label.add( new Kinetic.Text({x: lr_x,y: y0+h*1.05+h_v-6*Z,text:"0 (千株)",'align':"left",fill: 'gray',fontSize: 12*Z,fontFamily:fonts}) );	

		for(var i= 0;i<lb.length;i++){
			var x = x0 + w / (lb.length-1) * i; 
			layer_label.add( new Kinetic.Line({ points:[x,hh,x,hh+h_v],"stroke":"#ccc",dashArray: [3,3]}) ); 
		}
		
		// volume rect
		for(var i=0;i<volume.length;i++){
			(function(){
				var x = x0 + cali * 0.1 + cali*i;
				var y = y0 + h*1.05 + (vmax - volume[i])/v_len*h_v;
				var v = volume[i];
				layer_graphic.add( new Kinetic.Rect({x:x,y:y,width:cali*0.8,height: (volume[i]-vmin)/v_len*h_v ,fill: "#3366CC",shadow:{color: '#3366CC',opacity:0.5}} ) );
			})();
		}	

	}
	
	stage.add(layer_label);
	stage.add(layer_lr);
	stage.add(layer_backdrop);
	stage.add(layer_avg);
	stage.add(layer_line)
	stage.add(layer_graphic);
	stage.add(layer_opacity);
}

