// Agregando metodos utiles String
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};
String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};
String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};

String.prototype.equalsIgnoreCase=function(cad)
{
    if(cad===null)
        return false;
    return (""+this).toUpperCase()===((""+cad).toUpperCase());
};

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function()
{
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function()
  {
      
  };

  // Create a new Class that inherits from this class
  Class.extend = function(prop)
  {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop)
    {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] === "function" &&
        typeof _super[name] === "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();

Exception = function (messajeException)
{
    this.message= messajeException;
    this.toString=function()
    {
        return "Exception("+messajeException+")";
    };
};

var layout = 
{
    // Atributos generales para los layouts
    ATTR_LAYOUT_WIDTH : "layout_width",
    ATTR_LAYOUT_HEIGHT : "layout_height",
    ATTR_ID : "id",
    ATTR_LAYOUT_GRAVITY : "layout_gravity",
    ATTR_MARGIN : "margin",
    ATTR_MARGIN_TOP : "margin_top",
    ATTR_MARGIN_LEFT : "margin_left",
    ATTR_MARGIN_RIGHT : "margin_right",
    ATTR_MARGIN_BOTTOM : "margin_bottom",
    ATTR_ON_CLICK : "onClick",
    ATTR_BACKGROUND : "background",

    // TextView
    ATTR_LAYOUT_TEXT : "text",

    // Valores que pueden tomar los atributos
    MATCH_PARENT : "match_parent",
    WRAP_CONTENT : "wrap_content",
    LEFT : "left",
    RIGHT : "right",
    BOTTOM : "bottom",
    CENTER_HORIZONTAL : "center_horizontal",
    CENTER_VERTICAL : "center_vertical",
    CENTER : "center",
    TOP : "top",
    inflate:function($div)
    {
        var viewParent = this.parse($div);
        viewParent.onInit($div);
        this.build(viewParent);
        return viewParent;
    },
    build:function(view)
    {
        // Buscamos todos los hijos que tiene este elemento
        //var $childrens = view.elemJquery.children();
        //var $childrens = view.elemJquery.find('*');
        var $childrens = view.elemJquery.children();
//        console.log("PADRE --- > "+view.elemJquery[0].tagName +"( id = "+view.id+", nroHijos = "+$childrens.length+")");
        if($childrens.length>0)
        {
            if(view instanceof ViewGroup)
            {
                for(index = 0;index<$childrens.length;index++)
                {
                    var $divChild = $($childrens[index]);
                    var viewChild = this.parse($divChild);
                    viewChild.onInit($divChild);
//                    console.log(
//                            "HIJO --- > "+
//                            viewChild.elemJquery[0].tagName +
//                            "( id = "+
//                            viewChild.id+
//                            ", nroHijos del hijo = "+$divChild.children().length+
//                            ", nroHijos atributi = "+viewChild.viewsChilds.length+
//                            ")");
                    this.build(viewChild);
                    view.addView(viewChild);
                }
            }
            else
            {
                throw new Exception("El elemento: ["+view.elemJquery[0].tagName+"] no puede tener elementos anidados");
            }
        }
    },
    parse:function($div)
    {
        var views = 
            [
                // CONTENEDORES
                LINEAR_LAYOUT = "LinearLayout",
                FRAME_LAYOUT = "FrameLayout",
                RELATIVE_LAYOUT = "RelativeLayout",
                SCROLL_VIEW = "ScrollView",
                // View
                BUTTOM = "Buttom",
                TEXT_VIEW = "TextView",
                EDIT_TEXT = "EditText",
                IMAGE_VIEW = "ImageView",
                // Vistas genericas
                VIEW = "View",
                VIEW_GROUP = "ViewGroup"
            ];
            // Verificamos si exsite el layout
        var nameLayout = $div[0].tagName;
        for (var i=0; i<views.length; i++)
        {
            if(views[i].equalsIgnoreCase(nameLayout))
            {
                var layout = eval("new " + views[i] + "()");
                return layout;
            }
        }
        throw new Exception("No se reconoce el elemento ["+nameLayout+"]");
    }
};

View = Class.extend
({
    id:-1,
    layout_width:layout.WRAP_CONTENT,
    layout_height:layout.WRAP_CONTENT,
    onClick:null,
    visibility:"visible",
    layout_gravity:"left|top",
    layout_marginBottom:0,
    layout_marginRight:0,
    layout_marginTop:0,
    layout_marginLeft:0,
    layout_margin:0,
    parentView:null,
    elemJquery:null,
    width:0,
    height:0,
    bluided:false,
    onMeasure:function(widthMeasureSpec,heightMeasureSpec)
    {
        // Ancho de la vista
        switch (this.width)
        {
            case layout.MATCH_PARENT:
                if(widthMeasureSpec===0)
                    this.elemJquery.css('width','auto');
                else
                    this.elemJquery.css('width',"100%");
                break;
            case layout.WRAP_CONTENT:
                this.elemJquery.css('width','auto');
                break;
            default:
                this.elemJquery.css('width',this.width);
                break;
        }
        // alto de la vista
        switch (this.height)
        {
            case layout.MATCH_PARENT:
                if(heightMeasureSpec===0)
                    this.elemJquery.css('height','auto');
                else
                    this.elemJquery.css('height',"100%");
                break;
            case layout.WRAP_CONTENT:
                this.elemJquery.css('height','auto');
                break;
            default:
                this.elemJquery.css('height',this.height);
                break;
        }
        this.bluided = true;
    },
    onInit:function($div)
    {
        if ($div !== undefined)
        {
            this.elemJquery = $div;
            // ID de la vista
            if (this.elemJquery.attr(layout.ATTR_ID) !== undefined)
                this.id = this.elemJquery.attr(layout.ATTR_ID);

            //console.log("Iniciando vista ----> "+this.elemJquery[0].tagName +"( id = "+this.id+")");
            // FONDO DE PANTALLA
            if (this.elemJquery.attr(layout.ATTR_BACKGROUND) !== undefined)
            {
                //$div.css('background',"'"+$div.attr(ATTR_BACKGROUND)+"'");
                this.elemJquery.css('background',this.elemJquery.attr(layout.ATTR_BACKGROUND));
            }

            // DIMENSIONES DE LA VISTA
            this.elemJquery.css('position','absolute');
            if (this.elemJquery.attr(layout.ATTR_LAYOUT_WIDTH) !== undefined)
                this.width = this.elemJquery.attr(layout.ATTR_LAYOUT_WIDTH);
            else
                throw new Exception("No se a encontrado el atributo ["+layout.ATTR_LAYOUT_WIDTH+"]");

            if (this.elemJquery.attr(layout.ATTR_LAYOUT_HEIGHT) !== undefined)
                this.height = this.elemJquery.attr(layout.ATTR_LAYOUT_HEIGHT);
            else
                throw new Exception("No se a encontrado el atributo ["+layout.ATTR_LAYOUT_HEIGHT+"]");
        }
        else
        {
            $div = $("<div>");
            $div.attr(layout.ATTR_LAYOUT_WIDTH,layout.WRAP_CONTENT);
            $div.attr(layout.ATTR_LAYOUT_HEIGHT,layout.WRAP_CONTENT);
            this.onInit($div);
        }
        this.bluided = false;
    },
    setBackground:function(drawable)
    {
        this.elemJquery.css('background',drawable);
    },
    setLayoutGravity:function(gravity)
    {
        this.elemJquery.attr(layout.ATTR_LAYOUT_GRAVITY,gravity);
    }
});
TextView = View.extend
({
    text:null,
    onInit:function($div)
    {
        this._super($div);
        if (this.elemJquery.attr(layout.ATTR_LAYOUT_TEXT) !== undefined)
            this.text = this.elemJquery.attr(layout.ATTR_LAYOUT_TEXT);
        this.elemJquery.html(this.text);
    },
    setText:function(textParam)
    {
        this.elemJquery.html(textParam);
        if(this.builded)
        {
            if(this.parentView!==null)
                this.onMeasure(this.parentView.width,this.parentView.height);
            else
                this.onMeasure(layout.MATCH_PARENT,layout.MATCH_PARENT);
        }
    }
});
ViewGroup = View.extend
({
    viewsChilds:null,
    onInit:function($div)
    {
        this._super($div);
        this.viewsChilds = new Array();
    },
    addView:function(view)
    {
        this.viewsChilds.push(view);
        view.parentView = this;
        this.elemJquery.append(view.elemJquery);
        if(this.bluided)
        {
            //view.onMeasure(this.width,this.height);
            if(this.parentView!==null)
                this.onMeasure(this.parentView.width,this.parentView.height);
            else
                this.onMeasure(layout.MATCH_PARENT,layout.MATCH_PARENT);
        }
    },
    onMeasure:function(widthMeasureSpec,heightMeasureSpec)
    {
        this._super(widthMeasureSpec,heightMeasureSpec);
        for(var index =0;index<this.viewsChilds.length;index++)
        {
            this.viewsChilds[index].onMeasure(widthMeasureSpec,heightMeasureSpec);
        }
    }
});
FrameLayout = ViewGroup.extend
({
    onMeasure:function(widthMeasureSpec,heightMeasureSpec)
    {
        this._super(widthMeasureSpec,heightMeasureSpec);
        // Acomoda todos los hijos que con respecto a sus atributos
        for(var index =0;index<this.viewsChilds.length;index++)
        {
            //console.log("asdasdasdasd a dasd asd asdadasd ada");
            var view = this.viewsChilds[index];
            //LAYOUT_GRAVITY
            var gravitys = null;
            if (view.elemJquery.attr(layout.ATTR_LAYOUT_GRAVITY) === undefined)
                gravitys=[layout.LEFT,layout.TOP];
            else
            {
                gravitys = view.elemJquery.attr(layout.ATTR_LAYOUT_GRAVITY).split("|");
            }
            for(j = 0;j<gravitys.length;j++)
            {
                switch (gravitys[j])
                {
                    case layout.LEFT:view.elemJquery.css(layout.LEFT,'0px');break;
                    case layout.RIGHT:view.elemJquery.css(layout.RIGHT,'0px');break;
                    case layout.BOTTOM:view.elemJquery.css(layout.BOTTOM,'0px');break;
                    case layout.TOP:view.elemJquery.css(layout.TOP,'0px');break;
                    case layout.CENTER_VERTICAL:
                        view.elemJquery.css(layout.TOP,this.elemJquery.height()/2-view.elemJquery.height()/2);
                        break;
                    case layout.CENTER_HORIZONTAL:
                        view.elemJquery.css(layout.LEFT,this.elemJquery.width()/2-view.elemJquery.width()/2);
                        break;
                    case layout.CENTER:
                        view.elemJquery.css(layout.TOP,this.elemJquery.height()/2-view.elemJquery.height()/2);
                        view.elemJquery.css(layout.LEFT,this.elemJquery.width()/2-view.elemJquery.width()/2);
                        break;
                }
            }
        }
    }
});
LinearLayout = ViewGroup.extend
({
    onMeasure:function(widthMeasureSpec,heightMeasureSpec)
    {
        this._super(widthMeasureSpec,heightMeasureSpec);
        var ancho = this.elemJquery.width();
        var alto = this.elemJquery.height();
        
        // Acomoda todos los hijos que con respecto a sus atributos
        for(var index =0;index<this.viewsChilds.length;index++)
        {
            //console.log("asdasdasdasd a dasd asd asdadasd ada");
            var view = this.viewsChilds[index];
            //LAYOUT_GRAVITY
            var gravitys = null;
            if (view.elemJquery.attr(layout.ATTR_LAYOUT_GRAVITY) === undefined)
                gravitys=[layout.LEFT,layout.TOP];
            else
            {
                gravitys = view.elemJquery.attr(layout.ATTR_LAYOUT_GRAVITY).split("|");
            }
            for(j = 0;j<gravitys.length;j++)
            {
                switch (gravitys[j])
                {
                    case layout.LEFT:view.elemJquery.css(layout.LEFT,'0px');break;
                    case layout.RIGHT:view.elemJquery.css(layout.RIGHT,'0px');break;
                    case layout.BOTTOM:view.elemJquery.css(layout.BOTTOM,'0px');break;
                    case layout.TOP:view.elemJquery.css(layout.TOP,'0px');break;
                    case layout.CENTER_VERTICAL:
                        view.elemJquery.css(layout.TOP,this.elemJquery.height()/2-view.elemJquery.height()/2);
                        break;
                    case layout.CENTER_HORIZONTAL:
                        view.elemJquery.css(layout.LEFT,this.elemJquery.width()/2-view.elemJquery.width()/2);
                        break;
                    case layout.CENTER:
                        view.elemJquery.css(layout.TOP,this.elemJquery.height()/2-view.elemJquery.height()/2);
                        view.elemJquery.css(layout.LEFT,this.elemJquery.width()/2-view.elemJquery.width()/2);
                        break;
                }
            }
        }
    }
});

$(document).ready(function()
{
    var $body = $('body');
    var $child = $body.children();
    switch ($child.size())
    {
        case 0:
            break;
        case 1:
            var view = layout.inflate($($child[0]));
            view.onMeasure(layout.MATCH_PARENT,layout.MATCH_PARENT);

            // Agregamos una vista en tiempo real
            var txtTexto = new TextView();
            txtTexto.onInit();
            txtTexto.setBackground("#AA66DD");
            txtTexto.setText("En tiempo de ejecucion");
            txtTexto.setLayoutGravity("center_horizontal|top");
            view.addView(txtTexto);

            break;
        default:
            throw new Exception("Solo debe tener un contenedor dentro del body puede ser un View o un ViewGroup");
            break;
    }
});
