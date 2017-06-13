
/*
 * This plugin adds a footer containing speaker name, title and a logo
 *
 * Modified version of https://github.com/e-gor/Reveal.js-Title-Footer
 *
 */

var footy = {
  title: "",
  date: new Date(),
  speaker: "",
  backgroundcolor: 'rgba(51,51,102,255)',
  backgroundsecondcolor: 'rgba(125,125,171,255)',
  logopath: "",
  
  toDateString : function() {
    var datetext = "";
    dd = this.date.getDate();
    mm = this.date.getMonth();
    if (dd > 3)
      datetext = datetext+dd+"th ";
    else if (dd == 3)
      datetext = datetext+dd+"rd ";
    else if (dd == 2)
      datetext = datetext+dd+"nd ";
    else
      datetext = datetext+dd+"st ";
    var month = "";
    switch(mm+1) {
      case 1: month = "Jan";break;
      case 2: month = "Feb";break;
      case 3: month = "Mar";break;
      case 4: month = "Apr";break;
      case 5: month = "May";break;
      case 6: month = "Jun";break;
      case 7: month = "Jul";break;
      case 8: month = "Aug";break;
      case 9: month = "Sep";break;
      case 10: month = "Oct";break;
      case 11: month = "Nov";break;
      case 12: month = "Dec";break;
    }
    datetext = datetext+month+" "+this.date.getFullYear();
    return datetext;
    //return this.date.toISOString().substring(0, 10);
  }
};


footy.getElementsByTagNames=function(list,obj) {
	if (!obj)
		var obj=document;
	var tagNames=list.split(',');
	var resultArray=new Array();
	for (var i=0 ;i<tagNames.length; i++) {
		var tags=obj.getElementsByTagName(tagNames[i]);
		for (var j=0; j<tags.length; j++) {
			resultArray.push(tags[j]);
    }
	}
	var testNode=resultArray[0];
	if (!testNode)
		return [];
	if (testNode.sourceIndex) {
		resultArray.sort(function (a, b) {
				return a.sourceIndex-b.sourceIndex;
		});
	}
	else if (testNode.compareDocumentPosition) {
		resultArray.sort(function (a, b) {
				return 3-(a.compareDocumentPosition(b) & 6);
		});
	}
	return resultArray;
};

/* Method to initialize the footer */

footy.initialize = function(title, speaker, date, logopath, background, backgroundsecondcolor) {

	// Link to the Title-Footer CSS

	var link = document.createElement("link");
	link.href = "plugin/footy/footy.css";
	link.type = "text/css";
	link.rel = "stylesheet";
	document.getElementsByTagName("head")[0].appendChild(link);

	// Initialize properties according to parameters

	this.backgroundcolor = background || 'rgba(51,51,102,255)';
  this.backgroundsecondcolor = backgroundsecondcolor || 'rgba(125,125, 171, 255)';
  var date = date || new Date();
	var title = title || '';
  var speaker = speaker || '';
  var logopath = logopath || '';
  if (speaker != '')
    this.speaker = speaker;
	if (title != '')
		this.title = title;
	else {
		var first_section=document.getElementsByTagName('section')[0];
		if (first_section.getElementsByTagName('section').length>0)
			first_section = first_section.getElementsByTagName('section')[0];
		var title_elements = this.getElementsByTagNames('h1', first_section);
		if (title_elements.length > 0) {
			this.title = title_elements[0].textContent;
		}
	}
  if (logopath != '')
    this.logopath = logopath

  // Create the dom
  var footer = document.createElement('footer');
	footer.setAttribute('id','footy-footer');
	footer.setAttribute('style','background: linear-gradient(to top,'+this.backgroundcolor+','+this.backgroundsecondcolor+')');
  if (this.logopath != '') {
    var logo = document.createElement('div');
    logo.setAttribute('id', 'footy-logo');
    var image = document.createElement('img');
    image.setAttribute("src", this.logopath);
    image.setAttribute("height", "55");
    image.setAttribute("width", "60");
    logo.appendChild(image);
    footer.appendChild(logo);
  }
	var title_footer_p = document.createElement('p');
	title_footer_p.appendChild(document.createTextNode(this.speaker+" - "+this.title+ " - "+this.toDateString()));
  footer.appendChild(title_footer_p);
	var div_class_reveal = document.querySelectorAll('.reveal')[0];
	div_class_reveal.appendChild(footer);
};


