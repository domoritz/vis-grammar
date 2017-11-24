# A Visualization Grammar

This is an attempt at a grammar for visualization. I am borrowing ideas from the grammar of graphics, ggplot, D3, Vega, Vega-Lite, and SandDance. The goal of this grammar is to support an expressive range of visualizations with complex layouts such as in SandDance. Ultimately, I would like to convert this into a formal algebra that is compatible with relational algebra.

Similar to Vega-Lite, scales and axes can be inferred from an encoding. However, as opposed to the composition algebra in Vega-Lite, in this grammar Views and Marks are not treated differently. In other words, a mark can be an collection of marks (aka a view). This is similar to Vega. The difference to Vega is that this grammar is more concise.
