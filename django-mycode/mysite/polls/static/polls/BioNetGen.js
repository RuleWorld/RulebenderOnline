
var non_blank_line_regex   = new RegExp(/\S/);
var model_formulation_is_valid_regex         
      = new RegExp(/model\s+formulation\s+is\s+valid\./);
var comment_regex          = new RegExp(/\#(.*)/);
var molecules_regex        = new RegExp(/molecules/);
var line_number_regex      = new RegExp(/line\s+number/);
var begin_model_regex      = new RegExp(/begin\s+model/);
var end_model_regex        = new RegExp(/end\s+model/);
var begin_parameters_regex = new RegExp(/begin\s+parameters/);
var   end_parameters_regex = new RegExp(/end\s+parameters/);
var begin_species_regex    = new RegExp(/begin\s+species/);
var   end_species_regex    = new RegExp(/end\s+species/);
var begin_molecule_types_regex = new RegExp(/begin\s+molecule\s+types/);
var   end_molecule_types_regex = new RegExp(/end\s+molecule\s+types/);
var begin_observables_regex    = new RegExp(/begin\s+observables/);
var   end_observables_regex    = new RegExp(/end\s+observables/);
var begin_functions_regex      = new RegExp(/begin\s+functions/);
var   end_functions_regex      = new RegExp(/end\s+functions/);
var begin_seed_species_regex   = new RegExp(/begin\s+seed\s+species/);
var   end_seed_species_regex   = new RegExp(/end\s+seed\s+species/);
var begin_reaction_rules_regex = new RegExp(/begin\s+reaction\s+rules/);
var   end_reaction_rules_regex = new RegExp(/end\s+reaction\s+rules/);
var begin_compartments_regex   = new RegExp(/begin\s+compartments/);
var   end_compartments_regex   = new RegExp(/end\s+compartments/);



// var   parameters_regex = new RegExp(/\s*[\w]\s*[\w]\s*/);
// var   parameters_regex = new RegExp(/[_\w]{1,50}\s*\d+\.*\d*/);



CodeMirror.defineSimpleMode("my_simple_mode", {
  // The start state contains the rules that are intially used
  start: [
    //  Let's leave this out for now. 
    {regex: comment_regex,              token: "bngl_comment"},
    {regex: molecules_regex,            token: "bngl_observables"},
    {regex: begin_model_regex,          token: "bngl_section"},
    {regex:   end_model_regex,          token: "bngl_section"},
    {regex: begin_parameters_regex,     token: "bngl_section"},
    {regex:   end_parameters_regex,     token: "bngl_section"},
    {regex: begin_compartments_regex,   token: "bngl_section"},
    {regex:   end_compartments_regex,   token: "bngl_section"},
    {regex: begin_species_regex,        token: "bngl_section"},
    {regex:   end_species_regex,        token: "bngl_section"},
    {regex: begin_molecule_types_regex, token: "bngl_section"},
    {regex:   end_molecule_types_regex, token: "bngl_section"},
    {regex: begin_observables_regex,    token: "bngl_section"},
    {regex:   end_observables_regex,    token: "bngl_section"},
    {regex: begin_functions_regex,      token: "bngl_section"},
    {regex:   end_functions_regex,      token: "bngl_section"},
    {regex: begin_seed_species_regex,   token: "bngl_section"},
    {regex:   end_seed_species_regex,   token: "bngl_section"},
    {regex: begin_reaction_rules_regex, token: "bngl_section"},
    {regex:   end_reaction_rules_regex, token: "bngl_section"},
    {regex: /(\(|\))/, token: "bngl_blue"},
    {regex: line_number_regex, token: "bngl_red"},
    {regex: model_formulation_is_valid_regex, token: "bngl_green"},
    {regex: /true|false|null|undefined/, token: "atom"},
    {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
     token: "number"},
    {regex: /\/\/.*/, token: "comment"},
    {regex: /\/(?:[^\\]|\\.)*?\//, token: "variable-3"},
    // A next property will cause the mode to move to a different state
    {regex: /\/\*/, token: "comment", next: "comment"},
    {regex: /[-+\/*=<>!]+/, token: "operator"},
    // indent and dedent properties guide autoindentation
    {regex: /[a-z$][\w$]*/, token: "variable"},
    // You can embed other modes with the mode property. This rule
    // causes all code between << and >> to be highlighted with the XML
    // mode.
    {regex: /<</, token: "meta", mode: {spec: "xml", end: />>/}}
  ],
  // The multi-line comment state.
  comment: [
    {regex: /.*?\*\//, token: "comment", next: "start"},
    {regex: /.*/, token: "comment"}
  ],
  // The meta property contains global information about the mode. It
  // can contain properties like lineComment, which are supported by
  // all modes, and also directives like dontIndentStates, which are
  // specific to simple modes.
  meta: {
    dontIndentStates: ["comment"],
    lineComment: "//"
  }
});


