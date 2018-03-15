<script>
var b1Button;
var b2Button;
var b3Button;
var b4Button;
var c1Button;
var c2Button;
var c3Button;
window.onload = function() {
    b1Button = document.getElementById("b1");
    b2Button = document.getElementById("b2");
    b3Button = document.getElementById("b3");
    b4Button = document.getElementById("b4");
    c1Button = document.getElementById("c1");
    c2Button = document.getElementById("c2");
    c3Button = document.getElementById("c3");
}

var rhc_tabs = document.querySelectorAll('.tabbed li');
const markers = [];
var url_string = " ";
var bngl_string   = ' '; 
var error_string  = ''; 
var layout_string = ' '; 
var nodes_string  = ' ';
var edges_string  = ' ';
var edout         = ' ';
var fdout         = ' ';
var cur_mod_name  = ' ';
var cur_mod_key   = ' ';
var visible_map_type = '';
var BNGL_1_unused = 'Model 1: Unused ';   var BNGL_1_expires = ' ';
var BNGL_2_unused = 'Model 2: Unused ';   var BNGL_2_expires = ' ';
var BNGL_3_unused = 'Model 3: Unused ';   var BNGL_3_expires = ' ';
var BNGL_1_string = BNGL_1_unused;
var BNGL_2_string = BNGL_2_unused;
var BNGL_3_string = BNGL_3_unused;
var gutter_status = 'not_ok';
var gutter_rule_number;
var gutter_line = -1;
var gutter_rule = ' ';
var gutter_forward; 
var gutter_reverse; 
var gutter_continuation = 0; 
var gutter_end = 0; 
var gutter_found = 0; 
var urgency_lock = 0;
var send_aux; // Auxiliary parameter to be sent with data to the host

var parameters_old     = 0;    var parameters_new     = 0;
var seed_species_old   = 0;    var seed_species_new   = 0;
var reaction_rules_old = 0;    var reaction_rules_new = 0;
var observables_old    = 0;    var observables_new    = 0;
var species_old        = 0;    var species_new        = 0;


$('#rhc_input').val('BNG_'); 
$('.hclass00').hide(); 
$('.hclass01').hide(); 
$('.hclass02').hide(); 
$('.hclass03').hide(); 
$('.hclass04').hide(); 


for (var i = 0, len = rhc_tabs.length; i < len; i++) {
  rhc_tabs[i].addEventListener("click", function() {
    if (this.classList.contains('active')) return;

    var parent = this.parentNode,
    innerTabs = parent.querySelectorAll('li');
    for (var index = 0, iLen = innerTabs.length; index < iLen; index++) {
      innerTabs[index].classList.remove('active');
    }
    this.classList.add('active');
  });
}



function Grap1hCMap(){ // on dom ready
alert(" width ");

return;
}

function GraphCMap(){ // on dom ready
$('#cy').cytoscape({

   style: [
    {
      selector: 'node',
      css: {
        'content': 'data(label)',
        'shape': 'data(faveShape)',
        'width': 'mapData(weight, 40, 80, 90, 80)',
        'text-valign': 'center',
        'text-halign': 'center',
        'text-outline-width': 2,
        'text-outline-color': 'data(faveColor)',
        'background-color': 'data(faveColor)',
        'color':'#000'        
      }
    },
    {
      selector: '$node > node',
      css: {
        'padding-top': '20px',
        'padding-left': '10px',
        'padding-bottom': '10px',
        'padding-right': '10px',
        'text-valign': 'top',
        'text-halign': 'center'
      }
    },
    {
      selector: 'edge',
      css: {
        'target-arrow-shape': 'triangle',
        'line-color': 'data(faveColor)',
        'source-arrow-color': 'data(faveColor)',
        'target-arrow-color': 'data(faveColor)'

      }
    },
    {
      selector: ':selected',
      css: {
        'background-color': 'black',
        'line-color': 'black',
        'target-arrow-color': 'black',
        'source-arrow-color': 'black'
      }
    }
  ],



layout: { "name": "cose", "nodeOverlap": 10, "idealEdgeLength": 2, 
          "padding": 4, "coolingFactor": 0.95, "numIter": 200, 
          "fit": "True", "minTemp": 1, "gravity": 250, "edgeElasticity": 0.1, 
          "nestingFactor": 5, "nodeRepulsion": 10000, "initialTemp ": 200 },

  
// layout_string,
  


  
  
  ready: function(){
     window.cy = this;
//    var node_example = 
//    '{"nodes": [ { "data": { "#id": "a * b" }}, { "data": { "id": "b" }} ]}';
//    cy.add(JSON.parse(node_example));

//    cy.elements().layout(layout_string); 
    cy.add(JSON.parse(nodes_string));
    cy.add(JSON.parse(edges_string));

    cy.layout({ name: 'cose' });

//    cy.filter(function(i, element){
//      alert( element.data("id"))
//    });

   
    // giddy up...
    
    cy.elements().unselectify();
    
    cy.on('tap', 'node', function(e){
      var node = e.cyTarget; 
      var neighborhood = node.neighborhood().add(node);
      
      cy.elements().addClass('faded');
      neighborhood.removeClass('faded');
    });
    
    cy.on('tap', function(e){
      if( e.cyTarget === cy ){
        cy.elements().removeClass('faded');
      }
      
    });
      cy.panzoom({
          // options go here
        });
  }

});



} // on dom ready


//  $(document).ready(function() {
//    $("#button").click(
//  );
//    }
//  );


function deleteAllCookies() {
//  This doesn't work, due to the behaviour of document.cookie
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC"; 
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var utc_expiration = d.toUTCString();
    var expires = "expires=" + utc_expiration;
//    var ggg  = cname + "=" + cvalue + ";" + expires + ";path=/";
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//    alert("  The new cookie " + ggg);
    return utc_expiration;
}

function getNumCookies() {
    var ca = document.cookie.split(';');
    return ca.length;
}


function getCookieString(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            // alert("Looking at " + c.substring(name.length, c.length));
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function checkBNGLStrings(lstring) {

  alert(" checkBNGLStrings (entering) model or key name = " + lstring);

  var BNGL_1_temp = getCookieString("BNGL_1");
  if (BNGL_1_temp != '') { 
    var BNGL_1_key     = BNGL_1_temp.substring(1,BNGL_1_temp.indexOf("_",5));
    var BNGL_1_name    = BNGL_1_temp.substring(BNGL_1_temp.indexOf("_",5)+1);
    if (lstring == BNGL_1_key) {
      cur_mod_key = BNGL_1_key;
      return "key_found";
    }
    if (lstring == BNGL_1_name) {
      cur_mod_key = BNGL_1_key;
      return "name_found";
    }
  }

  var BNGL_2_temp = getCookieString("BNGL_2");
  if (BNGL_2_temp != '') { 
    var BNGL_2_key     = BNGL_2_temp.substring(1,BNGL_2_temp.indexOf("_",5));
    var BNGL_2_name    = BNGL_2_temp.substring(BNGL_2_temp.indexOf("_",5)+1);
    if (lstring == BNGL_2_key) {
      cur_mod_key = BNGL_2_key;
      return "key_found";
    }
    if (lstring == BNGL_2_name) {
      cur_mod_key = BNGL_2_key;
      return "name_found";
    }
  }

  var BNGL_3_temp = getCookieString("BNGL_3");
  if (BNGL_3_temp != '') { 
    var BNGL_3_key     = BNGL_3_temp.substring(1,BNGL_3_temp.indexOf("_",5));
    var BNGL_3_name    = BNGL_3_temp.substring(BNGL_3_temp.indexOf("_",5)+1);
    if (lstring == BNGL_3_key) {
      cur_mod_key = BNGL_3_key;
      return "key_found";
    }
    if (lstring == BNGL_3_name) {
      cur_mod_key = BNGL_3_key;
      return "name_found";
    }
  }

  return "not_found";
}


function createBNGLCookie(lkey) {

  // alert(" Calling  createBNGLCookie key = " + lkey);

  // Have a look at the three designated cookie names, BNGL_default,
  // BNGL_1, and BNGL_2, and 1) see if this one already exists, and 2) if
  // it doesn't exist, create a new cookie if one of the names is unused.
  // In either case 1) or 2), the expiration stamp should be updated.

  var check_strings = checkBNGLStrings(lkey);
  alert(" Call 1 (In createBNGLCookie)   check_strings = " + check_strings)
  if (check_strings == "key_found") {
    return "key_found";
  }

    var ostring = $('#rhc_input').val();
  nstring  = ostring.replace(/\s+/g,"");
  var nstring = $('#rhc_input').val();
  if (nstring == '') { nstring = 'BNGL_default'; }
  var cookie_value = '_' + lkey + '_' + nstring;

  var BNGL_1_temp = getCookieString("BNGL_1");
  if (BNGL_1_temp == '') { 
    BNGL_1_expires = setCookie('BNGL_1',cookie_value,30); 
    return "cookie_created";
  } 

  var BNGL_2_temp = getCookieString("BNGL_2");
  if (BNGL_2_temp == '') { 
    BNGL_2_expires = setCookie('BNGL_2',cookie_value,30); 
    return "cookie_created";
  } 

  var BNGL_3_temp = getCookieString("BNGL_3");
  if (BNGL_3_temp == '') { 
    BNGL_3_expires = setCookie('BNGL_3',cookie_value,30); 
    alert(" BNGL_3_expires = " + BNGL_3_expires)
    return "cookie_created";
  } 

  // Go ahead and overwrite the third cookie.
  BNGL_3_expires = setCookie('BNGL_3',cookie_value,30); 
  return "cookie_created";
}



// This transmitts the data for the first time
function SendBNGL(found_string,map_type,aux) {
                    // var input_string = $("#forminput").val();

                    /*
                    alert(' in SendBNGL  found_string is ' + found_string + "  " + '  map_type is ' + map_type + '   aux = ' + aux);
                    */

                    // If the name is not found, then we'll send the data
                    // without an accompanying key, and a key will be
                    // created by the host and set back.  If the name has
                    // been found, then the key should be sent in the first
                    // row of the data file, so that the host can use it as a 
                    // pointer to the work directory.
                    setURLString(found_string,map_type,aux);

                    alert(' Sending stuff through ajax  url_string = ' +
                          url_string)

                    // edout = editor.getValue();
                    $.ajax({
                        url : url_string, 
                        type : "POST",
                        dataType: "text", 
                        data : {
                            client_response : edout,
                            csrfmiddlewaretoken: '{{ csrf_token }}'
                            },
                        success : function(tjson) {
                            // alert("SUCCESS ");
                            //  alert(" SUCCESS: " + tjson); // xhr.status);
                            var rn = tjson.indexOf("RuleBender_51937"); 
                            var bn = tjson.indexOf("BioNetGen_51937"); 
                            var ef = tjson.indexOf("ErrorFile_51937"); 
                            var bf = tjson.indexOf("BNGL_File_51937"); 
                            var sn = tjson.indexOf("session_key_51937"); 

                            layout_string = tjson.substring(0,rn);
                            layout_string = layout_string.trim();
                            //   alert(" LAYOUT: " + layout_string);
                            nodes_string = tjson.substring(rn+17,bn-1);
                            nodes_string = nodes_string.trim();
                            //   alert(" NODES: " + nodes_string);
                            edges_string = tjson.substring(bn+17,ef-1);
                            edges_string = edges_string.trim();
                            //  alert(" EDGES: " + edges_string);
                            error_string = tjson.substring(ef+17,bf-1);
                            error_string = error_string.trim();
                            //  alert(" ERROR: " + error_string);
                            bngl_string  = tjson.substring(bf+17,sn-1);
                            bngl_string  = bngl_string.trim();
                            //  alert(" BNGL: "  + bngl_string);
                            key_string = tjson.substring(sn+18,tjson.length);
                            key_string = key_string.trim();
                            //  alert(" Key: " + key_string);
                            var cret = createBNGLCookie(key_string);
                            //  alert(" After createBNGLCookie cret = " + cret);
                            if (cret == "cant_create_cookie") {
                            //   alert(" The current model replaces your third model.");
                            //   alert(" cret = " + cret);
                            }
                            // alert(' map_type = ' + map_type);
                            //  if (map_type != 'regulatory') {
                              GraphCMap();
                            //  }
                        },
                        error : function(xhr,errmsg,err) {
                            alert(" ERROR " + xhr.status + ": " + 
                                   xhr.responseText);
                        }
                    });
                    return false;
            }













var cs = document.getElementById("modecode");
var validator = CodeMirror.fromTextArea(document.getElementById("validate"), {
//  value: (cs.textContent || cs.innerText || cs.innerHTML),
//  mode: 'my_simple_mode',
//  tabMode: 'indent',
//  lineNumbers: true,
//  lineWrapping: true,
//  autoCloseTags: true
    styleSelectedText: true
});
validator.setSize(null,190);


function numTokens(my_string) {
  var comma_list  = my_string.split(" ");

  var pcount = 0;
  for (kk = 0; kk < comma_list.length; kk++) { 
    var tab_list = comma_list[kk].split("\t");
    for (jj = 0; jj < tab_list.length; jj++) { 
      if ((tab_list[jj].trim()).length > 0) { pcount++; }  
    }
  }

return pcount;
}



function isCode(my_string) {
  var result = "code";
    if (comment_regex.test(my_string))          { result = "comment"; }
    if (!non_blank_line_regex.test(my_string))  { result = "comment"; }
  
    if (numTokens(my_string) == 2) {  
      if (begin_model_regex.test(my_string))           { result = "scthead"; }}
    if (numTokens(my_string) == 2) {  
      if (end_model_regex.test(my_string))             { result = "scthead"; }}

    if (numTokens(my_string) == 2) {  
      if (begin_parameters_regex.test(my_string))      { result = "scthead"; }}
    if (numTokens(my_string) == 2) {  
      if (end_parameters_regex.test(my_string))        { result = "scthead"; }}

    if (numTokens(my_string) == 3) {  
      if (begin_seed_species_regex.test(my_string))    { result = "scthead"; }}
    if (numTokens(my_string) == 3) {  
      if (end_seed_species_regex.test(my_string))      { result = "scthead"; }}

    if (numTokens(my_string) == 3) {  
      if (begin_molecule_types_regex.test(my_string))  { result = "scthead"; }}
    if (numTokens(my_string) == 3) {  
      if (end_molecule_types_regex.test(my_string))    { result = "scthead"; }}

    if (numTokens(my_string) == 2) {  
      if (begin_species_regex.test(my_string))         { result = "scthead"; }}
    if (numTokens(my_string) == 2) {  
      if (end_species_regex.test(my_string))           { result = "scthead"; }}

    if (numTokens(my_string) == 2) {  
      if (begin_observables_regex.test(my_string))     { result = "scthead"; }}
    if (numTokens(my_string) == 2) {  
      if (end_observables_regex.test(my_string))       { result = "scthead"; }}

    if (numTokens(my_string) == 2) {  
      if (begin_functions_regex.test(my_string))       { result = "scthead"; }}
    if (numTokens(my_string) == 2) {  
      if (end_functions_regex.test(my_string))         { result = "scthead"; }}

    if (numTokens(my_string) == 3) {  
      if (begin_reaction_rules_regex.test(my_string))  { result = "scthead"; }}
    if (numTokens(my_string) == 3) {  
      if (end_reaction_rules_regex.test(my_string))    { result = "scthead"; }}

    if (numTokens(my_string) == 2) {  
      if (begin_compartments_regex.test(my_string))    { result = "scthead"; }}
    if (numTokens(my_string) == 2) {  
      if (end_compartments_regex.test(my_string))      { result = "scthead"; }}


  // alert(' isCode string: ' + my_string + ' isCode returning ' + result);
  return result;
}



function getSection(sname,lstring) {


     var b_ses     = begin_seed_species_regex.test(lstring);
     var e_ses     =   end_seed_species_regex.test(lstring);
     var b_par     = begin_parameters_regex.test(lstring);
     var e_par     =   end_parameters_regex.test(lstring);
     var b_mot     = begin_molecule_types_regex.test(lstring);
     var e_mot     =   end_molecule_types_regex.test(lstring);
     var b_spc     = begin_species_regex.test(lstring);
     var e_spc     =   end_species_regex.test(lstring);
     var b_obs     = begin_observables_regex.test(lstring);
     var e_obs     =   end_observables_regex.test(lstring);
     var b_fnc     = begin_functions_regex.test(lstring);
     var e_fnc     =   end_functions_regex.test(lstring);
     var b_rer     = begin_reaction_rules_regex.test(lstring);
     var e_rer     =   end_reaction_rules_regex.test(lstring);
     var b_com     = begin_compartments_regex.test(lstring);
     var e_com     =   end_compartments_regex.test(lstring);
     var e_mod     =   end_model_regex.test(lstring);

//      sname = "none";
     if (b_par) { sname = "parameters";     }
     if (b_mot) { sname = "molecule_types"; }
     if (b_spc) { sname = "species";        }
     if (b_obs) { sname = "observables";    }
     if (b_fnc) { sname = "functions";      } 
     if (b_ses) { sname = "seed_species";   }
     if (b_com) { sname = "compartments";   }
     if (b_rer) { sname = "reaction_rules"; } 
//     if (b_mod) { sname = "none"; }

//     if (sname != "none") { alert(" section is " + sname); }


     if (sname == "parameters")      { parameters_new++; }
     if (sname == "species")         { species_new++; }
     if (sname == "observables")     { observables_new++; }
     if (sname == "reaction_rules")  { reaction_rules_new++; }
     if (sname == "seed_species")    { seed_species_new++; }


     if (e_par) { sname = "none"; }
     if (e_mot) { sname = "none"; }
     if (e_spc) { sname = "none"; }
     if (e_obs) { sname = "none"; }
     if (e_fnc) { sname = "none"; }
     if (e_rer) { sname = "none"; }
     if (e_ses) { sname = "none"; }
     if (e_com) { sname = "none"; }
     if (e_mod) { sname = "simulation"; }

return sname;
}

function setButtonColors() {

    b4Button.click();

    document.getElementById("b1").style.backgroundColor = "#f1f1f1";
    document.getElementById("b2").style.backgroundColor = "#f1f1f1";
    document.getElementById("b3").style.backgroundColor = "#f1f1f1";
    document.getElementById("b4").style.backgroundColor = "#f1f1f1";

    document.getElementById("c1").style.backgroundColor = "#f1f1f1";
    document.getElementById("c2").style.backgroundColor = "#f1f1f1";
    document.getElementById("c3").style.backgroundColor = "#f1f1f1";
}

var loopcount = 0;

var sc = document.getElementById("modecode");
var editor = CodeMirror.fromTextArea(document.getElementById("cm"), {
  value: (sc.textContent || sc.innerText || sc.innerHTML),
  mode: 'my_simple_mode',
  tabMode: 'indent',
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  // gutters: ["note-gutter", "CodeMirror-linenumbers", "breakpoints"]
  gutters: ["rhc-gutter", "CodeMirror-linenumbers", "note-gutter"]
});

editor.setGutterMarker(0,"note-gutter",document.createTextNode("-"));
editor.setGutterMarker(0,"rhc-gutter", document.createTextNode("-"));

function set4ForType() {
  /*
    alert(' setVisType ' + visible_map_type + 
             ' Rule No. ' + gutter_rule_number);
  */
  visible_map_type = 'compact';
  updateBlob('urgent_forward');
  visible_map_type = 'patternmap';
return;
}

function set4RevType() {
  /*
    alert(' setVisType ' + visible_map_type + 
             ' Rule No. ' + gutter_rule_number);
  */
  visible_map_type = 'compact';
  updateBlob('urgent_reverse');
  alert(' Why does the visible_map_type change?');
  visible_map_type = 'patternmap';
return;
}

function setForType() {
  /*
    alert(' setVisType ' + visible_map_type + 
             ' Rule No. ' + gutter_rule_number);
  */
  updateBlob('urgent_forward');
return;
}

function setRevType() {
  /*
    alert(' setVisType ' + visible_map_type + 
             ' Rule No. ' + gutter_rule_number);
  */
  updateBlob('urgent_reverse');
return;
}


editor.on("gutterClick", function(cm, n) {
    urgency_lock = 1;
    var info = cm.lineInfo(n);
    gutter_line = n;
    // alert("gutterClick   gutter_line = " + gutter_line);
    updateBlob('check_gutter');
    // alert("gutterClick   gutter_status = " + gutter_status);
    if (gutter_status == 'ok') {
       
       /* 
        alert(" Clicked gutter gutter_rule: " + gutter_rule + " rule_number " 
            + gutter_rule_number + " visible_map_type: " + visible_map_type);
       */
        
      
      // cm.setGutterMarker(n, "breakpoints", info.gutterMarkers ? null : makeMarker());
      // setButtonColors();
      // b2Button.click();
      if (visible_map_type == '') {
        alert(" Please select a graph type from the tabs: " +
              "Contact, Direct, Compact, Regulatory");
        return
      }
      if (visible_map_type == 'contactmap') {
          $('.tclass01').show();
          $('.tclass02a').hide();
          $('.tclass03a').hide();
          $('.tclass04a').hide();
          $('.tclass02b').hide();
          $('.tclass03b').hide();
          $('.tclass04b').hide();
          $('.tclass02c').hide();
          $('.tclass03c').hide();
          $('.tclass04c').hide();
      }
      if (visible_map_type == 'patternmap') {
          $('.tclass01').hide();
          $('.tclass02a').hide();
          $('.tclass03a').hide();
          $('.tclass04a').hide();
          if ('no_reverse' == check_reverse(gutter_rule)) {
            $('.tclass02b').show();
            $('#rule_div02b').html(gutter_rule);
            $('.tclass03b').hide();
            $('.tclass04b').show();
            $('.tclass02c').hide();
            $('.tclass03c').hide();
            $('.tclass04c').hide();
          }  else {
            $('.tclass02b').hide();
            $('.tclass03b').hide();
            $('.tclass04b').hide();
            $('.tclass02c').show();
            $('#rule_div02c').html(gutter_rule);
            $('.tclass03c').hide();
            $('.tclass04c').show();
          }
      }
      if (visible_map_type == 'regulatory') {
          $('.tclass01').hide();
          $('.tclass02a').hide();
          $('.tclass03a').hide();
          $('.tclass04a').hide();
          if ('no_reverse' == check_reverse(gutter_rule)) {
            $('.tclass02b').hide();
            $('.tclass03b').show();
            $('#rule_div03b').html(gutter_rule);
            $('.tclass04b').hide();
            $('.tclass02c').hide();
            $('.tclass03c').hide();
            $('.tclass04c').hide();
          }  else {
            $('.tclass02b').hide();
            $('.tclass03b').hide();
            $('.tclass04b').hide();
            $('.tclass02c').hide();
            $('.tclass03c').show();
            $('#rule_div03c').html(gutter_rule);
            $('.tclass04c').hide();
          }
      }
      /*
      if (visible_map_type == 'compact') {
          $('.tclass01').hide();
          $('.tclass02a').hide();
          $('.tclass03a').hide();
          $('.tclass04a').hide();
          if ('no_reverse' == check_reverse(gutter_rule)) {
            $('.tclass02b').hide();
            $('.tclass03b').hide();
            $('.tclass04b').show();
            $('#rule_div04c').html(gutter_rule);
            $('.tclass02c').hide();
            $('.tclass03c').hide();
            $('.tclass04c').hide();
          }  else {
            $('.tclass02b').hide();
            $('.tclass03b').hide();
            $('.tclass04b').hide();
            $('.tclass02c').hide();
            $('.tclass03c').hide();
            $('.tclass04c').show();
            $('#rule_div04c').html(gutter_rule);
          }
          alert("  gutter_rule " + gutter_rule);
      }
      */

      // alert('Is there a reverse rule ? ' + ggg);
      // visible_map_type = 'patternmap';
      // updateBlob('urgent');
    } else {
      alert(" Gutter status not ok ");
    }
});


function makeMarker() {
  var marker = document.createElement("div");
  marker.style.color = "#822";
  marker.innerHTML = "●";
  return marker;
}


editor.on('dblclick', function() {
  alert('Double Click');
});

/*
function callUpdateBlob(which_blob) {
updateBlob('urgent');
}
*/


/*
setInterval(function callUpdateBlob() {
   if (urgency_lock == 0) {
     visible_map_type = 'parse';
     updateBlob("not_urgent");
     visible_map_type = '';
   }
}, 9000);
*/



// setInterval(function() {
 function updateBlob(urgency_direction) {
   var urgency = '';
   var section_name = "none";
   var stuff_to_print = "";
   editor.refresh();
   edout = editor.getValue();
   var section_count = 0;

   /*   
   alert(' Entering updateBlob   visible_map_type ' + visible_map_type +
         ' urgency ' + urgency_direction);
   */
   
//   deleteAllCookies(); 
   if (urgency_direction == 'urgent_forward') {
       send_aux    = '__R' + gutter_forward;
       urgency     = 'urgent';
       //  alert(' Requesting forward chart for rule: ' + send_aux);
   } else {
       if (urgency_direction == 'urgent_reverse') {
           /* Use the forward index for both forward and reverse */
           send_aux    = '__reverse__R' + gutter_forward;
           urgency     = 'urgent';
           alert(' Requesting reverse chart for rule: ' + send_aux);
       } else {
           urgency = urgency_direction;
       }
   }
   if (urgency != 'not_urgent') {
     urgency_lock = 1;
     // alert('  Entering updateBlob urgency = ' + urgency);
   }
   if (urgency == 'check_gutter') { gutter_forward=0; 
                                    gutter_reverse=0; 
                                    gutter_status='not_ok'; }

   parameters_new     = 0;
   seed_species_new   = 0;
   reaction_rules_new = 0;
   observables_new    = 0;
   species_new        = 0;

   manageYourBNGLModels(); // Extend expiration date.

   var ostring = $('#rhc_input').val();
   cur_mod_name = ostring.replace(/\s+/g,"");
   if (cur_mod_name == '') { $('#rhc_input').val('BNG_'); 
     cur_mod_name = $('#rhc_input').val();
   } else {
     if (cur_mod_name != ostring) { $('#rhc_input').val(cur_mod_name); 
       alert(" Removing blanks from model name: " + cur_mod_name);
     }
     $('#rhc_button').val(" Save " + cur_mod_name + 
       " on the server. "); 
   }


   // alert(" gutter_line starts at: " + gutter_line);
   var lines = edout.split('\n');
   var i=0;
   while(i < lines.length){
     var iline = i+1;
     var sline = lines[i].trim();
     i++;

     // Remove any comment
     var comlb = sline.indexOf("#");
     var comub = "";
     if (comlb > -1) { comub = sline.substring(0,comlb); } 
     if (comlb < 0)  { comub = sline; }

     // Remove any continuation
     // Wait !!  This cannot work if there's more than one continuation line.
     // Fortunately, this can be fixed by simply putting a loop around this
     // block.  One iteration of the loop for each continuation line that you'd
     // like to permit.
     gutter_continuation = i-1;
     gutter_end = i;

     var conlb = comub.indexOf('\\');
     while (conlb > -1) {
       if (conlb > -1) { 
         gutter_end = gutter_end + 1;
         /*
         if ((iline > gutter_line-5) && (iline < gutter_line+5)) {
           alert(' gutter_end = ' + gutter_end); 
         }
         */
         var conub = comub.substring(0,conlb); 
         if (i+1<lines.length) {
           conub = conub + " " + lines[i].trim();
           // alert(' lets add in: ' + lines[i].trim());
           i++;
         }
         // Corrupting the value of gutter_line is bad, but it works
         
         if (gutter_end == gutter_line+1) {
           // alert(' setting the gutter_found 1');
           gutter_found = 1;
         } 
         comub = conub;
       } 
       conlb = comub.indexOf('\\');
     }

     if (gutter_end == gutter_line) {
       // alert(' setting the gutter_found 2');
       gutter_found = 1;
     } 
     /*
     if ((iline > gutter_line-5) && (iline < gutter_line+5)) {
       alert(' comub: ' + comub.substr(0,5) + '  iline ' + iline + 
             ' gutter_line+1 ' + (gutter_line + 1) + ' gutter_end ' +
               gutter_end + ' continuation ' + gutter_continuation);
     }
     */

     section_name = getSection(section_name,comub);

//     stuff_to_print = stuff_to_print + " " + comub + " " + section_name + 
//     "  " + isCode(comub) + "  " +  numTokens(comub) + "\n\n";

     if (section_name == "none") {
       if ((isCode(comub) == "code") && (section_count > -1)) {
         section_count = section_count + 1;
         stuff_to_print = stuff_to_print + 
          "Line Number " + iline + "\n" +
          "BNGL code was found that does not belong to a section:\n" +
          "    " + sline + "\n\n";
       }
     }
     if (section_name == "parameters") {
       if (isCode(comub) == "code") {
         if (numTokens(comub) > 2) {
           stuff_to_print = stuff_to_print + 
             "Line Number " + iline + "\n" +
             "The following statement is not a parameter definition:\n" +
             "    " + sline + "\n\n";

         }
       }
     }
     if (section_name == "reaction_rules") {
       if (urgency == 'check_gutter') {
         // alert(' iline = ' + iline + ' isCode = ' + isCode(comub));
         if (isCode(comub) == "code") {
           if (iline <= gutter_line+1) {
             gutter_forward = gutter_forward + 1;
             /*
              alert(' gutter_forward = ' + gutter_forward + 
                    ' iline = ' + iline + ' gutter_continuation ' +
                    gutter_continuation);  */
           }
           var qqq = check_reverse(comub);
           /*
           if ((iline > gutter_line-5) && (iline < gutter_line+5)) {
             alert(' comub ' + comub + ' qqq ' + qqq);
           }
           */
           if ((qqq == 'reverse') && (iline <= gutter_line+1)) {
             gutter_reverse = gutter_reverse + 1;
             // alert(' gutter_reverse = ' + gutter_reverse);
           }
           /*
           alert(' Inspected line: ' + comub + ' Forward ' + gutter_forward 
                                             + ' Reverse ' + gutter_reverse);

           if ((iline > gutter_line-5) && (iline < gutter_line+5)) {
             alert(" gutter_continuation = " + (gutter_continuation) + 
               " iline: " + iline);
           }
           */
           if (iline == gutter_continuation+1) {
             if (gutter_found == 1) {
               gutter_status = 'ok';
               // gutter_rule_number = gutter_forward;
               gutter_rule = comub;
               /*        
               alert(" Graphing rule: " + gutter_rule + " Forward: " 
                     + gutter_forward + " Reverse: "  + gutter_reverse);
               alert(" Highlighting from : " + gutter_continuation + " To: " 
                     + gutter_end);
               */ 
               for (ijk = gutter_continuation; ijk < gutter_end; ijk++) {
                 markers.push(editor.markText({line: ijk, ch: 0}, 
                         {line: ijk, ch: 80}, 
                         {className: "styled-background"}));
               }
               stuff_to_print = ''; 
               gutter_found = 0;
             }
           }
         } else {
             //  alert(' not code ');
         }
       }
     }
   }

   if (urgency != 'not_urgent') {
     urgency_lock = 0;
     gutter_line = -1;
   }
   if (urgency != 'urgent') {
     if (urgency != 'not_urgent') {
       // alert(" Leaving from here    urgency = " + urgency);
       return;
     }
   }



   if (non_blank_line_regex.test(stuff_to_print)) {
     validator.setValue(stuff_to_print);
     if (urgency == 'urgent') {
       alert(' The model formulation is invalid.  See details below.');
     }
   } else {
     loopcount++;
     if (error_string.length > 0) {

       validator.setValue(error_string);

       
       ind_rhc = error_string.indexOf("line ");
       if (ind_rhc > -1) {
         ind_col  = error_string.indexOf(":");
         err_line    = error_string.substring(5,error_string.indexOf(":"));
         // alert(" err_line = " + err_line); 
         /*
         editor.markText({line: (err_line-1), ch: 0}, 
                         {line: (err_line-1), ch: 60}, 
                         {className: "styled-background"});
         */
         // alert(" Setting marker for line: " + err_line);
         markers.push(editor.markText({line: (err_line-1), ch: 0}, 
                         {line: (err_line-1), ch: 60}, 
                         {className: "styled-background"}));
       }
      




     } else {
       validator.setValue("Model formulation is valid.  \n"
       + "\n"
       + " " + BNGL_1_string + "\n"
       + " " + BNGL_2_string + "\n"
       + " " + BNGL_3_string + "\n"
       + "\n"
       + " Loopcount:" + loopcount + "\n"
       + " Number of parameters:     " + parameters_new + "\n"
       + " Number of seed species:   " + seed_species_new + "\n"
       + " Number of reaction rules: " + reaction_rules_new + "\n"
       + " Number of observables:    " + observables_new + "\n"
       + " Number of species:        " + species_new + "\n"
       );
     }

     if (visible_map_type != '') {
         if (urgency == 'urgent') {
             // alert(' urgent: visible_map_type = ' + visible_map_type + 
             //       ' gutter_status = ' + gutter_status);
             var  visible_map_type1 = visible_map_type;
             if (visible_map_type == 'patternmap') {
               if (gutter_status == 'ok') {
                 visible_map_type1 = 'patternone';
               }
             }
             if (visible_map_type == 'compact') {
               if (gutter_status == 'ok') {
                 visible_map_type1 = 'compact_one';
                 visible_map_type = 'patternmap';
               }
             }
             if (visible_map_type == 'regulatory') {
               if (gutter_status == 'ok') {
                 visible_map_type1 = 'regulatory_one';
               }
             }
             var string_check = checkBNGLStrings(cur_mod_name) 
             alert(" Call 2  string_check = " + string_check)
             SendBNGL(string_check,visible_map_type1,send_aux);
         } 
         if (urgency == 'not_urgent') {
           if ((parameters_old != parameters_new) ||
               (seed_species_old != seed_species_new) ||
               (reaction_rules_old != reaction_rules_new) ||
               (observables_old != observables_new) ||
               (species_old != species_new)) {
                 var string_check = checkBNGLStrings(cur_mod_name) 
                 alert(" Call 3  string_check = " + string_check)
                 SendBNGL(string_check,visible_map_type,send_aux);
           }
         }
     }

     parameters_old     = parameters_new;
     seed_species_old   = seed_species_new;
     reaction_rules_old = reaction_rules_new;
     observables_old    = observables_new;
     species_old        = species_new;
   }
// }, 3000);
}

function deleteCookie(ystring) {
  document.cookie = "username=" + ystring + "; expires=Thu, 01 Jan 1970 00:00:00 UTC"; 
}

function manageYourBNGLModels() {
//  $('.hclass00').hide();

   // setCookie("BNGL_2","long_cookie_string","30");
   // var ncookies = getNumCookies();
   // alert(" ncookies = " + ncookies);

   var BNGL_1_var = getCookieString("BNGL_1");
   var BNGL_2_var = getCookieString("BNGL_2");
   var BNGL_3_var = getCookieString("BNGL_3");
   if ( BNGL_1_var.trim() + BNGL_2_var.trim() + BNGL_3_var.trim() != '') {
     $('.hclass00').show(); }

//   alert(" BNGL_2 is " + BNGL_2_var);
   if ( BNGL_1_var.trim() != '') { 
     $('.hclass01').show(); 
     var BNGL_1_key     = BNGL_1_var.substring(1,BNGL_1_var.indexOf("_"));
     var BNGL_1_name    = BNGL_1_var.substring(BNGL_1_var.indexOf("_",5)+1);
     $('.hclass01a').text(BNGL_1_name); 
     BNGL_1_expires = setCookie('BNGL_1',BNGL_1_var,30);
     BNGL_1_string = "Model 1:    Expiration: " + BNGL_1_expires + "  Name: " + BNGL_1_name;
   } else {
     BNGL_1_string = BNGL_1_unused;
   }

   if ( BNGL_2_var.trim() != '') { 
     $('.hclass02').show(); 
     var BNGL_2_key     = BNGL_2_var.substring(1,BNGL_2_var.indexOf("_"));
     var BNGL_2_name    = BNGL_2_var.substring(BNGL_2_var.indexOf("_",5)+1);
     $('.hclass02a').text(BNGL_2_name); 
     BNGL_2_expires = setCookie('BNGL_2',BNGL_2_var,30);
     BNGL_2_string = "Model 2:    Expiration: " + BNGL_2_expires + "  Name: " + BNGL_2_name;
   } else {
     BNGL_2_string = BNGL_2_unused;
   }

   if ( BNGL_3_var.trim() != '') { 
     $('.hclass03').show(); 
     var BNGL_3_key     = BNGL_3_var.substring(1,BNGL_3_var.indexOf("_"));
     var BNGL_3_name    = BNGL_3_var.substring(BNGL_3_var.indexOf("_",5)+1);
     $('.hclass03a').text(BNGL_3_name); 
     BNGL_3_expires = setCookie('BNGL_3',BNGL_3_var,30);
     BNGL_3_string = "Model 3:    Expiration: " + BNGL_3_expires + "  Name: " + BNGL_3_name;
   } else {
     BNGL_3_string = BNGL_3_unused;
   }
}  





// addBNGLModel();
// checkCookie();

// var rhc_date  = new Date();
// var rhc_month = rhc_date.getMonth(); 
// var rhc_day   = rhc_date.getDate(); 

// alert(" Month " + rhc_month + " Day " + rhc_day);
// GraphCMap();
// updateBlob(); 


function clearAll(evt) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
}

function closeCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
}

function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;
    // alert(' Calling openCity: ' + cityName);
    visible_map_type = '';

    markers.forEach(marker => marker.clear());
    error_string  = ''; 
    // alert(" Clearing Markers");

    if (cityName == 'contactmap')      { visible_map_type = 'contactmap'; }
    if (cityName == 'patternmap')      { visible_map_type = 'patternmap'; 
                                         gutter_status='not_ok'; }
    if (cityName == 'regulatory')      { visible_map_type = 'regulatory';
                                         gutter_status='not_ok'; 
                                         // alert(' zeroing it out ');
                                        $('#cy').cytoscape({ /* */ }); 
                                        //$('#cy').val(' ');
                                        }
    // if (cityName == 'compact')         { visible_map_type = 'compact';
    //                                      gutter_status='not_ok'; }

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";

 
    if (cityName == 'contactmap')      { visible_map_type = 'contactmap'; 
                                         updateBlob("urgent");
                                       }
    if (cityName == 'patternmap')      { visible_map_type = 'patternmap'; 
                                         gutter_status='not_ok'; 
                                         updateBlob("urgent");
                                       }
    if (cityName == 'regulatory')      { visible_map_type = 'regulatory'; 
                                         gutter_status='not_ok'; 
                                         updateBlob("urgent");
                                       }
    if (cityName == 'compact')         { visible_map_type = 'compact'; 
                                         gutter_status='not_ok'; 
                                         updateBlob("urgent");
                                       }
    // $('#cy').resize();
}

function check_reverse(rule_string_input) {
  var rule_string = rule_string_input.trim();
  var rflag = 'no_reverse';
  var rl = ' ';

  var res_words = ["DeleteMolecules","exclude_reactants","include_reactants",
                   "MoveConnected","exclude_products","include_products"];

  if (rule_string != '') {
      for (jj=0; jj<res_words.length; jj++) {
        rl = rule_string.indexOf(res_words[jj]);
        if (rl > -1) { rule_string = rule_string.substring(0,rl); }
      }

      rl = rule_string.lastIndexOf(",");
      // var rexpreg2 = /\s*\S+\s+(\S*\s*)*\s+(->|<-|<->)\s+\S+\s*,\s*\S+/i;
      rule_string = rule_string.substring(rl,rule_string.length);
      // alert(' ' + rule_string);

      var rexpreg2 = /\S/i;
      if (rexpreg2.test(rule_string)) {
        rexpreg2 = /\)/i;
        if (!rexpreg2.test(rule_string)) {
          rflag = 'reverse';
        }
      }
      // alert(' ' + rule_string_input);
      // alert(rflag);
  }

  return rflag;
}

// ######################################################################
//
// ######################################################################

function setURLString(lfound_string,lmap_type,laux) {

   if (lfound_string == 'name_found') {
     // alert(" mod_key  " + cur_mod_key);
     // alert("name found mod_name " + cur_mod_name);
     fdout = ' ';
     if (lmap_type == 'contactmap') {
       url_string = "/polls/cmap_key/";
       fdout = cur_mod_key + "\n" + cur_mod_name + "\n" + edout;
     }
     if (lmap_type == 'patternmap') {
       url_string = "/polls/pmap_key/";
       fdout = cur_mod_key + "\n" + cur_mod_name + "\n" + edout;
     }
     if (lmap_type == 'patternone') {
       url_string = "/polls/pone_key/";
       fdout = cur_mod_key + "\n" + cur_mod_name + "\n" + 
               laux + "\n" + edout;
     }
     if (lmap_type == 'compact') {
       url_string = "/polls/comp_key/";
       fdout = cur_mod_key + "\n" + cur_mod_name + "\n" + edout;
     }
     if (lmap_type == 'compact_one') {
       url_string = "/polls/cone_key/";
       fdout = cur_mod_key + "\n" + cur_mod_name + "\n" + 
               laux + "\n" + edout;
     }
     if (lmap_type == 'regulatory') {
       url_string = "/polls/omap_key/";
       fdout = cur_mod_key + "\n" + cur_mod_name + "\n" + edout;
     }
     if (lmap_type == 'parse') {
       alert(" Doing parse with key ");
       url_string = "/polls/parse_key/";
       fdout = cur_mod_key + "\n" + cur_mod_name + "\n" + edout;
     }
     if (lmap_type == 'regulatory_one') {
       url_string = "/polls/oone_key/";
       fdout = cur_mod_key + "\n" + cur_mod_name + "\n" +
               laux + "\n" + edout;
     }
     // alert(" fdout  " + fdout);
     edout = fdout;
   } else {
     alert(" Calling (no_key) mod_name " + cur_mod_name);
     fdout = ' ';
     if (lmap_type == 'parse') {
       alert(" Doing parse without key ");
       url_string = "/polls/parse/";
       fdout = cur_mod_name + "\n" + edout;
     }
     if (lmap_type == 'contactmap') {
       url_string = "/polls/cmap/";
       fdout = cur_mod_name + "\n" + edout;
     }
     if (lmap_type == 'patternone') {
       url_string = "/polls/pone/";
       fdout = cur_mod_name + "\n" + laux + "\n" + edout;
     }
     if (lmap_type == 'patternmap') {
       url_string = "/polls/pmap/";
       fdout = cur_mod_name + "\n" + edout;
     }
     if (lmap_type == 'compact') {
       url_string = "/polls/comp/";
       fdout = cur_mod_name + "\n" + edout;
     }
     if (lmap_type == 'compact_one') {
       url_string = "/polls/cone/";
       fdout = cur_mod_name + "\n" + laux + "\n" + edout;
     }
     if (lmap_type == 'regulatory') {
       print(" This is not yet implemented ")
       url_string = "/polls/omap/";
       fdout = cur_mod_name + "\n" + edout;
     }
     if (lmap_type == 'regulatory_one') {
       url_string = "/polls/oone/";
       fdout = cur_mod_name + "\n" + laux + "\n" + edout;
     }
     // alert(" fdout  " + fdout);
     edout = fdout;
   }

   return;
}


// ######################################################################
//
// ######################################################################

function rhcButton() {
  alert(" Happy Day ");
}
</script>
