﻿using System.Collections.Generic;
using SourcemapToolkit.SourcemapParser;
using SourcemapToolkit.SourcemapParser.Core;

namespace SourcemapToolkit.CallstackDeminifier
{
	/// <summary>
	/// Describes information regarding a binding that can be used for minification.
	/// Examples include methods, functions, and object declarations.
	/// </summary>
	internal class BindingInformation
	{
		/// <summary>
		/// The name of the method or class
		/// </summary>
		public string Name;

		/// <summary>
		/// The location of the function name or class declaration
		/// </summary>
		public SourcePosition SourcePosition;
	}

	/// <summary>
	/// Contains information regarding the location of a particular function in a JavaScript file
	/// </summary>
	internal class FunctionMapEntry
	{
		/// <summary>
		/// A list of bindings that are associated with this function map entry.
		/// To get the complete name of the function associated with this mapping entry
		/// append the names of each bindings with a "."
		/// </summary>
		public List<BindingInformation> Bindings { get; set; }
		
		/// <summary>
		/// If this entry represents a function whose name was minified, this value 
		/// may contain an associated deminfied name corresponding to the function.
		/// </summary>
		public string DeminfifiedMethodName { get; set; } 

		/// <summary>
		/// Denotes the location of the beginning of this function
		/// </summary>
		public SourcePosition StartSourcePosition { get; set; }

		/// <summary>
		/// Denotes the end location of this function
		/// </summary>
		public SourcePosition EndSourcePosition { get; set; }
	}
}
