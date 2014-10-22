var ChartLine;
ChartLine=function(){function q(f){var n,a,r,o,j;this.title=f.title;this.id=f.id;this.W=null!=(n=f.width)?n:960;this.H=null!=(a=f.height)?a:480;this.ll=f.label_left;this.lb=f.label_bottom;this.data=f.data;this.average=f.average;this.R=null!=(r=f.ratio)?r:0.8;this.digit=null!=(o=f.digit)?o:6;this.Z=null!=(j=f.zoom)?j:this.W/960}q.prototype.draw=function(){var f,n,a,r,o,j,w,b,k,s,z,c,x,t,i,y,A,B,C,D,d,p,l,e,g,h,q,u,v,E,m=this;Math.pow(10,this.digit);f=this.R*this.W;j=this.R*this.H;l=(1-this.R)/2*this.W;
e=(1-this.R)/2*this.H;w=this.ll.max-this.ll.min;n=f/this.data.length;p=new Kinetic.Stage({container:this.id,width:this.W,height:this.H});a=["MS Gothic","sans-serif"];this.ll.max=Number(this.ll.max);this.ll.min=Number(this.ll.min);if(null==(k=this.ll).cali)k.cali=5;if(null==(k=this.average[0]).color)k.color="#0099cc";if(null==(k=this.average[1]).color)k.color="#ff9900";c=new Kinetic.Layer;t=new Kinetic.Layer;s=new Kinetic.Layer;k=new Kinetic.Layer;z=new Kinetic.Layer;x=new Kinetic.Layer;o=new Kinetic.Group;
x.add(o);c.add(new Kinetic.Text({x:0,y:e/2,width:this.W,text:this.title.string,textFill:"brown",fontSize:16*this.Z,align:"center",fontStyle:"bold",fontFamily:a}));b=g=0;for(h=this.ll.cali;0<=h?g<=h:g>=h;b=0<=h?++g:--g)i=e+j*(this.ll.cali-b)/this.ll.cali-7*this.Z,d=(this.ll.min+(this.ll.max-this.ll.min)/this.ll.cali*b).toFixed(this.digit),c.add(new Kinetic.Text({x:0,y:i,width:l-6*this.Z,text:d,align:"right",textFill:"gray",fontStyle:"bold",fontFamily:["MS Gothic","sans-serif"],fontSize:12*this.Z}));
d=l+f+6*this.Z;c.add(new Kinetic.Rect({x:d,y:e,width:12*this.Z,height:12*this.Z,fill:"#3366CC"}));c.add(new Kinetic.Text({x:d+16*this.Z,y:e,text:"\u30ec\u30fc\u30c8",textFill:"#3366CC",fontSize:12*this.Z,align:"left",fontStyle:"bold",fontFamily:a}));D=new Kinetic.Text({x:d,y:e+20*this.Z,width:l-12*this.Z,align:"right",text:" ",textFill:"#3366CC",fontSize:12*this.Z,fontStyle:"bold",fontFamily:a});t.add(D);c.add(new Kinetic.Rect({x:d,y:e+40*this.Z,width:12*this.Z,height:12*this.Z,fill:this.average[0].color}));
c.add(new Kinetic.Text({x:d+16*this.Z,y:e+40*this.Z,text:this.average[0].string,textFill:this.average[0].color,fontSize:12*this.Z,align:"left",fontStyle:"bold",fontFamily:a}));A=new Kinetic.Text({x:d,y:e+60*this.Z,width:l-12*this.Z,align:"right",text:" ",textFill:this.average[0].color,fontSize:12*this.Z,fontStyle:"bold",fontFamily:a});t.add(A);c.add(new Kinetic.Rect({x:d,y:e+80*this.Z,width:12*this.Z,height:12*this.Z,fill:this.average[1].color}));c.add(new Kinetic.Text({x:d+16*this.Z,y:e+80*this.Z,
text:this.average[1].string,textFill:this.average[1].color,fontSize:12*this.Z,align:"left",fontStyle:"bold",fontFamily:a}));B=new Kinetic.Text({x:d,y:e+100*this.Z,width:l-12*this.Z,align:"right",text:" ",textFill:this.average[1].color,fontSize:12*this.Z,fontStyle:"bold",fontFamily:a});t.add(B);c.add(new Kinetic.Rect({x:d,y:e+120*this.Z,width:12*this.Z,height:12*this.Z,fill:"#CC0000"}));c.add(new Kinetic.Text({x:d+16*this.Z,y:e+120*this.Z,text:"\u65e5\u4ed8",textFill:"#CC0000",fontSize:12*this.Z,align:"left",
fontStyle:"bold",fontFamily:a}));C=new Kinetic.Text({x:d,y:e+140*this.Z,width:l-12*this.Z,align:"right",text:" ",textFill:"#CC0000",fontSize:12*this.Z,fontStyle:"bold",fontFamily:a});t.add(C);i=1.5*e+j;b=g=0;for(h=this.lb.length-1;0<=h?g<=h:g>=h;b=0<=h?++g:--g)d=l+f/(this.lb.length-1)*b,c.add(new Kinetic.Text({x:d-50*this.Z,y:i,text:this.lb[b],fontSize:12*this.Z,textFill:"gray",fontFamily:a}));b=a=0;for(g=this.ll.cali;0<=g?a<=g:a>=g;b=0<=g?++a:--a)d=l+f,i=e+j*b/this.ll.cali,s.add(new Kinetic.Line({points:[l,
i,d,i],stroke:"#CCC",strokeWidth:1}));v=this.average;g=0;for(h=v.length;g<h;g++){f=v[g];a="";E=f.values;b=u=0;for(q=E.length;u<q;b=++u)if(i=E[b])d=l+n*b+n/2,i=e+(this.ll.max-i)/w*j,a=a?a+("L"+d+","+i):"M"+d+","+i;k.add(new Kinetic.Path({data:a,stroke:f.color,lineJoin:"round",strokeWidth:1}))}r="";a=this.data;d=function(){var a,d,f,g,i,c,h,k,p,q,s,u,v;q=y[0];v=y[1];c=l+n*b+n/2;h=e+(m.ll.max-v)/w*j;k=e+(m.ll.max-m.average[0].values[b])/w*j;p=e+(m.ll.max-m.average[1].values[b])/w*j;g=m.average[0].values[b];
i=m.average[1].values[b];r=r?r+("L"+c+","+h):"M"+c+","+h;s=new Kinetic.Path({data:"M"+c+","+e+"L"+c+","+(e+j),stroke:"#CC0000",opacity:0});u=new Kinetic.Rect({x:c-n/2,y:e+j,width:n,height:5*m.Z,fill:"#CC0000",opacity:0});a=new Kinetic.Circle({x:c,y:h,radius:4*m.Z,fill:"#3366CC",opacity:0});d=new Kinetic.Circle({x:c,y:k,radius:4*m.Z,fill:m.average[0].color,opacity:0});f=new Kinetic.Circle({x:c,y:p,radius:4*m.Z,fill:m.average[1].color,opacity:0});o.add(s);o.add(u);o.add(a);o.add(d);o.add(f);c=new Kinetic.Rect({x:l+
n*b,y:e,width:n,height:j,fill:"#FFF",opacity:0});c.on("mouseover touchmove tap",function(){var c,e,b,h;h=o.getChildren();b=0;for(e=h.length;b<e;b++)c=h[b],c.setOpacity(0);s.setOpacity(1);u.setOpacity(1);a.setOpacity(1);d.setOpacity(1);f.setOpacity(1);C.setText(q);D.setText(v);A.setText(g);B.setText(i);x.draw();return t.draw()});return z.add(c)};b=f=0;for(i=a.length;f<i;b=++f)y=a[b],y[1]&&d();k.add(new Kinetic.Path({data:r,stroke:"#3366CC",lineJoin:"round",strokeWidth:2,shadow:{color:"#3366CC"}}));
p.add(c);p.add(t);p.add(s);p.add(k);p.add(x);return p.add(z)};return q}();