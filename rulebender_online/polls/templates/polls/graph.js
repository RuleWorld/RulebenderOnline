


<script>



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
  
  //layout:{'coolingFactor': 0.95, 'initialTemp': 200,'nodeRepulsion': 100, 'nodeOverlap': 10, 'gravity': 650, 'padding': 4, 'name': 'cose', 'nestingFactor': 2, 'initialTemp ': 2000, 'minTemp': 1, 'numIter': 100, 'edgeElasticity': 500, 'idealEdgeLength': 10},
   
   layout:{'name': 'dagre','fit':true,'padding':30,'directed': false},

  elements: {'nodes': [{'data': {'width': 'label.length * 10', 'faveColor': '#f4bbb8', 'id': '0', 'faveShape': 'rectangle', 'label': 'Grb2(SH2!1).Shc(Y317!1)'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#f4bbb8', 'id': '1', 'faveShape': 'rectangle', 'label': 'Grb2(SH2!1).egfr(Y1068!1)'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#f4bbb8', 'id': '2', 'faveShape': 'rectangle', 'label': 'Grb2(SH3!+)'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#f4bbb8', 'id': '3', 'faveShape': 'rectangle', 'label': 'Grb2(SH3!1).Sos(dom!1)'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#f4bbb8', 'id': '4', 'faveShape': 'rectangle', 'label': 'Shc(PTB!+)'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#f4bbb8', 'id': '5', 'faveShape': 'rectangle', 'label': 'Shc(PTB!1).egfr(Y1148!1)'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#f4bbb8', 'id': '6', 'faveShape': 'rectangle', 'label': 'Shc(Y317~pY)'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#f4bbb8', 'id': '7', 'faveShape': 'rectangle', 'label': 'egf(r!1).egfr(l!1)'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#f4bbb8', 'id': '8', 'faveShape': 'rectangle', 'label': 'egfr(Y1068~pY)'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#f4bbb8', 'id': '9', 'faveShape': 'rectangle', 'label': 'egfr(Y1148~pY)'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#f4bbb8', 'id': '10', 'faveShape': 'rectangle', 'label': 'egfr(l!+)'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#f4bbb8', 'id': '11', 'faveShape': 'rectangle', 'label': 'egfr(r!+)'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#f4bbb8', 'id': '12', 'faveShape': 'rectangle', 'label': 'egfr(r!1).egfr(r!1)'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '13', 'faveShape': 'octagon', 'label': '_R1'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '14', 'faveShape': 'octagon', 'label': '_R10'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '15', 'faveShape': 'octagon', 'label': '_R11'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '16', 'faveShape': 'octagon', 'label': '_R12'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '17', 'faveShape': 'octagon', 'label': '_R13'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '18', 'faveShape': 'octagon', 'label': '_R14'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '19', 'faveShape': 'octagon', 'label': '_R15'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '20', 'faveShape': 'octagon', 'label': '_R16'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '21', 'faveShape': 'octagon', 'label': '_R17'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '22', 'faveShape': 'octagon', 'label': '_R18'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '23', 'faveShape': 'octagon', 'label': '_R19'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '24', 'faveShape': 'octagon', 'label': '_R2'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '25', 'faveShape': 'octagon', 'label': '_R20'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '26', 'faveShape': 'octagon', 'label': '_R21'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '27', 'faveShape': 'octagon', 'label': '_R22'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '28', 'faveShape': 'octagon', 'label': '_R23'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '29', 'faveShape': 'octagon', 'label': '_R3'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '30', 'faveShape': 'octagon', 'label': '_R4'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '31', 'faveShape': 'octagon', 'label': '_R5'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '32', 'faveShape': 'octagon', 'label': '_R6'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '33', 'faveShape': 'octagon', 'label': '_R7'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '34', 'faveShape': 'octagon', 'label': '_R8'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '35', 'faveShape': 'octagon', 'label': '_R9'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '36', 'faveShape': 'octagon', 'label': '_reverse__R1'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '37', 'faveShape': 'octagon', 'label': '_reverse__R10'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '38', 'faveShape': 'octagon', 'label': '_reverse__R11'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '39', 'faveShape': 'octagon', 'label': '_reverse__R12'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '40', 'faveShape': 'octagon', 'label': '_reverse__R13'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '41', 'faveShape': 'octagon', 'label': '_reverse__R14'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '42', 'faveShape': 'octagon', 'label': '_reverse__R15'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '43', 'faveShape': 'octagon', 'label': '_reverse__R16'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '44', 'faveShape': 'octagon', 'label': '_reverse__R17'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '45', 'faveShape': 'octagon', 'label': '_reverse__R18'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '46', 'faveShape': 'octagon', 'label': '_reverse__R19'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '47', 'faveShape': 'octagon', 'label': '_reverse__R2'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '48', 'faveShape': 'octagon', 'label': '_reverse__R20'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '49', 'faveShape': 'octagon', 'label': '_reverse__R22'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '50', 'faveShape': 'octagon', 'label': '_reverse__R23'}}, {'data': {'width': 'label.length * 10', 'faveColor': '#bbb8f4', 'id': '51', 'faveShape': 'octagon', 'label': '_reverse__R9'}}], 'edges': [{'data': {'source': 3, 'faveColor': '#5e3c58', 'target': 2, 'id': '3_2'}}, {'data': {'source': 5, 'faveColor': '#5e3c58', 'target': 4, 'id': '5_4'}}, {'data': {'source': 7, 'faveColor': '#5e3c58', 'target': 10, 'id': '7_10'}}, {'data': {'source': 12, 'faveColor': '#5e3c58', 'target': 11, 'id': '12_11'}}, {'data': {'source': 13, 'faveColor': '#5e3c58', 'target': 7, 'id': '13_7'}}, {'data': {'source': 8, 'faveColor': '#798e87', 'target': 14, 'id': '8_14'}}, {'data': {'source': 14, 'faveColor': '#5e3c58', 'target': 1, 'id': '14_1'}}, {'data': {'source': 2, 'faveColor': '#798e87', 'target': 14, 'id': '2_14'}}, {'data': {'source': 8, 'faveColor': '#798e87', 'target': 15, 'id': '8_15'}}, {'data': {'source': 1, 'faveColor': '#798e87', 'target': 15, 'id': '1_15'}}, {'data': {'source': 15, 'faveColor': '#5e3c58', 'target': 3, 'id': '15_3'}}, {'data': {'source': 9, 'faveColor': '#798e87', 'target': 16, 'id': '9_16'}}, {'data': {'source': 16, 'faveColor': '#5e3c58', 'target': 5, 'id': '16_5'}}, {'data': {'source': 9, 'faveColor': '#798e87', 'target': 17, 'id': '9_17'}}, {'data': {'source': 17, 'faveColor': '#5e3c58', 'target': 5, 'id': '17_5'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 17, 'id': '6_17'}}, {'data': {'source': 0, 'faveColor': '#798e87', 'target': 18, 'id': '0_18'}}, {'data': {'source': 9, 'faveColor': '#798e87', 'target': 18, 'id': '9_18'}}, {'data': {'source': 18, 'faveColor': '#5e3c58', 'target': 5, 'id': '18_5'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 18, 'id': '6_18'}}, {'data': {'source': 0, 'faveColor': '#798e87', 'target': 19, 'id': '0_19'}}, {'data': {'source': 9, 'faveColor': '#798e87', 'target': 19, 'id': '9_19'}}, {'data': {'source': 3, 'faveColor': '#798e87', 'target': 19, 'id': '3_19'}}, {'data': {'source': 19, 'faveColor': '#5e3c58', 'target': 5, 'id': '19_5'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 19, 'id': '6_19'}}, {'data': {'source': 20, 'faveColor': '#5e3c58', 'target': 0, 'id': '20_0'}}, {'data': {'source': 9, 'faveColor': '#798e87', 'target': 20, 'id': '9_20'}}, {'data': {'source': 5, 'faveColor': '#798e87', 'target': 20, 'id': '5_20'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 20, 'id': '6_20'}}, {'data': {'source': 21, 'faveColor': '#5e3c58', 'target': 0, 'id': '21_0'}}, {'data': {'source': 9, 'faveColor': '#798e87', 'target': 21, 'id': '9_21'}}, {'data': {'source': 3, 'faveColor': '#798e87', 'target': 21, 'id': '3_21'}}, {'data': {'source': 5, 'faveColor': '#798e87', 'target': 21, 'id': '5_21'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 21, 'id': '6_21'}}, {'data': {'source': 0, 'faveColor': '#798e87', 'target': 22, 'id': '0_22'}}, {'data': {'source': 22, 'faveColor': '#5e3c58', 'target': 3, 'id': '22_3'}}, {'data': {'source': 4, 'faveColor': '#798e87', 'target': 22, 'id': '4_22'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 22, 'id': '6_22'}}, {'data': {'source': 23, 'faveColor': '#5e3c58', 'target': 0, 'id': '23_0'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 23, 'id': '6_23'}}, {'data': {'source': 10, 'faveColor': '#798e87', 'target': 24, 'id': '10_24'}}, {'data': {'source': 24, 'faveColor': '#5e3c58', 'target': 12, 'id': '24_12'}}, {'data': {'source': 25, 'faveColor': '#5e3c58', 'target': 0, 'id': '25_0'}}, {'data': {'source': 2, 'faveColor': '#798e87', 'target': 25, 'id': '2_25'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 25, 'id': '6_25'}}, {'data': {'source': 6, 'faveColor': '#5e3c58', 'target': 26, 'id': '6_26'}}, {'data': {'source': 27, 'faveColor': '#5e3c58', 'target': 3, 'id': '27_3'}}, {'data': {'source': 0, 'faveColor': '#798e87', 'target': 28, 'id': '0_28'}}, {'data': {'source': 28, 'faveColor': '#5e3c58', 'target': 3, 'id': '28_3'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 28, 'id': '6_28'}}, {'data': {'source': 29, 'faveColor': '#5e3c58', 'target': 8, 'id': '29_8'}}, {'data': {'source': 11, 'faveColor': '#798e87', 'target': 29, 'id': '11_29'}}, {'data': {'source': 30, 'faveColor': '#5e3c58', 'target': 9, 'id': '30_9'}}, {'data': {'source': 11, 'faveColor': '#798e87', 'target': 30, 'id': '11_30'}}, {'data': {'source': 8, 'faveColor': '#5e3c58', 'target': 31, 'id': '8_31'}}, {'data': {'source': 9, 'faveColor': '#5e3c58', 'target': 32, 'id': '9_32'}}, {'data': {'source': 9, 'faveColor': '#798e87', 'target': 33, 'id': '9_33'}}, {'data': {'source': 11, 'faveColor': '#798e87', 'target': 33, 'id': '11_33'}}, {'data': {'source': 5, 'faveColor': '#798e87', 'target': 33, 'id': '5_33'}}, {'data': {'source': 33, 'faveColor': '#5e3c58', 'target': 6, 'id': '33_6'}}, {'data': {'source': 4, 'faveColor': '#798e87', 'target': 34, 'id': '4_34'}}, {'data': {'source': 6, 'faveColor': '#5e3c58', 'target': 34, 'id': '6_34'}}, {'data': {'source': 8, 'faveColor': '#798e87', 'target': 35, 'id': '8_35'}}, {'data': {'source': 35, 'faveColor': '#5e3c58', 'target': 1, 'id': '35_1'}}, {'data': {'source': 7, 'faveColor': '#5e3c58', 'target': 36, 'id': '7_36'}}, {'data': {'source': 8, 'faveColor': '#798e87', 'target': 37, 'id': '8_37'}}, {'data': {'source': 1, 'faveColor': '#5e3c58', 'target': 37, 'id': '1_37'}}, {'data': {'source': 2, 'faveColor': '#798e87', 'target': 37, 'id': '2_37'}}, {'data': {'source': 8, 'faveColor': '#798e87', 'target': 38, 'id': '8_38'}}, {'data': {'source': 1, 'faveColor': '#798e87', 'target': 38, 'id': '1_38'}}, {'data': {'source': 3, 'faveColor': '#5e3c58', 'target': 38, 'id': '3_38'}}, {'data': {'source': 9, 'faveColor': '#798e87', 'target': 39, 'id': '9_39'}}, {'data': {'source': 5, 'faveColor': '#5e3c58', 'target': 39, 'id': '5_39'}}, {'data': {'source': 9, 'faveColor': '#798e87', 'target': 40, 'id': '9_40'}}, {'data': {'source': 5, 'faveColor': '#5e3c58', 'target': 40, 'id': '5_40'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 40, 'id': '6_40'}}, {'data': {'source': 0, 'faveColor': '#798e87', 'target': 41, 'id': '0_41'}}, {'data': {'source': 9, 'faveColor': '#798e87', 'target': 41, 'id': '9_41'}}, {'data': {'source': 5, 'faveColor': '#5e3c58', 'target': 41, 'id': '5_41'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 41, 'id': '6_41'}}, {'data': {'source': 0, 'faveColor': '#798e87', 'target': 42, 'id': '0_42'}}, {'data': {'source': 9, 'faveColor': '#798e87', 'target': 42, 'id': '9_42'}}, {'data': {'source': 3, 'faveColor': '#798e87', 'target': 42, 'id': '3_42'}}, {'data': {'source': 5, 'faveColor': '#5e3c58', 'target': 42, 'id': '5_42'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 42, 'id': '6_42'}}, {'data': {'source': 0, 'faveColor': '#5e3c58', 'target': 43, 'id': '0_43'}}, {'data': {'source': 9, 'faveColor': '#798e87', 'target': 43, 'id': '9_43'}}, {'data': {'source': 5, 'faveColor': '#798e87', 'target': 43, 'id': '5_43'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 43, 'id': '6_43'}}, {'data': {'source': 0, 'faveColor': '#5e3c58', 'target': 44, 'id': '0_44'}}, {'data': {'source': 9, 'faveColor': '#798e87', 'target': 44, 'id': '9_44'}}, {'data': {'source': 3, 'faveColor': '#798e87', 'target': 44, 'id': '3_44'}}, {'data': {'source': 5, 'faveColor': '#798e87', 'target': 44, 'id': '5_44'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 44, 'id': '6_44'}}, {'data': {'source': 0, 'faveColor': '#798e87', 'target': 45, 'id': '0_45'}}, {'data': {'source': 3, 'faveColor': '#5e3c58', 'target': 45, 'id': '3_45'}}, {'data': {'source': 4, 'faveColor': '#798e87', 'target': 45, 'id': '4_45'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 45, 'id': '6_45'}}, {'data': {'source': 0, 'faveColor': '#5e3c58', 'target': 46, 'id': '0_46'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 46, 'id': '6_46'}}, {'data': {'source': 10, 'faveColor': '#798e87', 'target': 47, 'id': '10_47'}}, {'data': {'source': 12, 'faveColor': '#5e3c58', 'target': 47, 'id': '12_47'}}, {'data': {'source': 0, 'faveColor': '#5e3c58', 'target': 48, 'id': '0_48'}}, {'data': {'source': 2, 'faveColor': '#798e87', 'target': 48, 'id': '2_48'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 48, 'id': '6_48'}}, {'data': {'source': 3, 'faveColor': '#5e3c58', 'target': 49, 'id': '3_49'}}, {'data': {'source': 0, 'faveColor': '#798e87', 'target': 50, 'id': '0_50'}}, {'data': {'source': 3, 'faveColor': '#5e3c58', 'target': 50, 'id': '3_50'}}, {'data': {'source': 6, 'faveColor': '#798e87', 'target': 50, 'id': '6_50'}}, {'data': {'source': 8, 'faveColor': '#798e87', 'target': 51, 'id': '8_51'}}, {'data': {'source': 1, 'faveColor': '#5e3c58', 'target': 51, 'id': '1_51'}}]},
  
  ready: function(){
    window.cy = this;
    
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
</script>

          <style scoped>

        .button-success,
        .button-secondary {
            color: white;
            border-radius: 4px;
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        }

        .button-success {
            background: rgb(28, 184, 65); /* this is a green */
        }

  
    </style>

  <!-- <div id="cy" style="height:85%;width:100%"></div> -->
  <!-- <div id="div_cy"></div> -->


  <!--
  <div id="options" style="height:10%;width=100%;position: absolute; bottom:0">
<input id="jsonvalue" name="jsonvalue" type="submit" class="button-success pure-button" value="Save file as gml">
</div>
-->
