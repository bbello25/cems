﻿using SourcemapToolkit.SourcemapParser.Core;

namespace SourcemapToolkit.CallstackDeminifier.Core
{
    /// <summary>
    /// Represents a single entry in a JavaScript stack frame. 
    /// </summary>
    public class StackFrame
    {
        /// <summary>
        /// The name of the method
        /// </summary>
        public string MethodName { get; set; }

        /// <summary>
        /// The path of the file where this code is defined
        /// </summary>
        public string FilePath { get; set; }

        /// <summary>
        /// The zero-based position of this stack entry.
        /// </summary>
        public SourcePosition SourcePosition { get; set; }

        public string SourceCode { get; set; }
    }
}