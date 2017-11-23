// Types
// =====

type Definition = {
        type?: 'ordinal' | 'quantitative'
        field: string,
    } |
    // primitive values
    number | string | boolean;

// shortcuts for x and y
type Layout =
    // layer is the default layout
    'layer' |
    // same as `x: {field: '_row'}`
    'horizontal' |
    // same as `y: {field: '_row'}`
    'vertical' | {
        type: 'wrap',
        columns?: number
    } // TODO: add more

type Encoding = {
    x?: Definition,
    y?: Definition,
    // for 3D layouts
    z?: Definition

    // mark color or group background color
    color?: Definition,
    shape?: Definition,
    opacity?: Definition,
    size?: Definition,
    angle?: Definition,
    // TODO: add more channels

    // group by (can be used for faceting without using any of the properties above)
    detail?: Definition,
    
    // the coordinate system used
    coordinates?: 'cartesian' | 'radial',
    
    // shortcut to specify how mark instances are laid out
    layout?: Layout
}

type Transform = {
        bin: string,
        as: string
    } |
    // the group by can be inferred from the fields that are used in an child view
    {
        aggregate: string,
        field?: string,
        as: string
    } // TODO: add more

type MarkType = 'point' | 'bar' | 'line' | 'area' | 'rect' | 'rule' | 'tick';

// View defines a class of primitive or group marks that will be instantiated.
type View = {
    /**
     * Ordered list of data transformations.
     */
    transform?: Transform[],

    /**
     * View specifies a template for a mark or group that can be instantiated or an already instantiated list of marks.
     * 
     * It can either be a primitive, a group mark.
     * 
     * *Alternative names*: mark, group, view
     */
    view: MarkType | View | View[],

    /**
     * Properties that should be applied to mark instances.
     * 
     * *Alternative names*: encoding, properties
     */
    encoding: Encoding
}


// Examples
// ========


// Bar chart

const bar: View = {
    view: 'bar',
    encoding: {
        x: {field: 'foo', type: 'ordinal'},
        y: {field: 'bar', type: 'quantitative'},
        color: 'steelblue'
    }
}

// Histogram

const hist: View = {
    transform: [
        {bin: 'foo', as: 'binned_foo'},
        // implicit group by binned_foo
        {aggregate: 'count', as: 'count'}
    ],
    view: 'bar',
    encoding: {
        x: {field: 'binned_foo'},
        y: {field: 'count'}
    }
}


// Scatterplot

const scatter: View = {
    view: 'point',
    encoding: {
        x: {field: 'foo'},
        y: {field: 'bar'}
    }
}

// Layered

const layer: View = {
    view: [{
        transform: [
            // implicit group by foo
            {
            aggregate: 'count',
            as: 'count'
        }],
        view: 'bar',
        encoding: {
            x: {field: 'foo', type: 'ordinal'},
            y: {field: 'count'}
        }
    }, {
        transform: [{
            aggregate: 'count',
            as: 'count'
        }],
        view: 'rule',
        encoding: {
            y: {field: 'count'},
            color: 'firebrick'
        }
    }],
    // optional for this example
    encoding: {
        layout: 'layer'
    }
}

// Faceted with horizontal layout

const hfacet: View = {
    view: {
        view: 'point',
        encoding: {
            x: {field: 'foo'},
            y: {field: 'bar'}
        }
    },
    encoding: {
        detail: {field: 'baz'},
        layout: 'horizontal'
    }
}


// Faceted with wrapping

const wfacet: View = {
    view: {
        view: 'point',
        encoding: {
            x: {field: 'foo'},
            y: {field: 'bar'}
        }
    },
    encoding: {
        detail: {field: 'baz'},
        layout: {type: 'wrap', columns: 3}
    }
}

// Horizontal concatenation

const hconcat: View = {
    view: [{
        view: 'point',
        encoding: {
            x: {field: 'foo'},
            y: {field: 'bar'}
        }
    }, {
        transform: [{
            aggregate: 'count',
            as: 'count'
        }],
        view: 'bar',
        encoding: {
            x: {field: 'baz', type: 'ordinal'},
            y: {field: 'count'}
        }
    }],
    encoding: {
        layout: 'horizontal'
    }
}

// Unit visualization with faceted bars

const unit: View = {
    view: {
        view: {
            view: 'point',
            encoding: {
                x: {field: 'foo'},
                y: {field: 'bar'}
            }
        },
        encoding: {
            detail: {field: 'baz'},
            // specifying the columns is not great
            layout: {type: 'wrap', columns: 5}
        }
    },
    encoding: {
        layout: 'horizontal'
    }
}

// A scatterplot with small bar charts

const scatterHist: View = {
    view: {
        view: 'bar',
        encoding: {
            x: {field: 'baz', type: 'ordinal'},
            y: {field: 'qux'}
        }
    },
    encoding: {
        x: {field: 'foo', type: 'quantitative'},
        y: {field: 'bar', type: 'quantitative'},
        size: 30  // size of the bar charts as they cannot be inferred
    }
}