using System;

namespace cems.API.Models
{
    interface ITrackable
    {
        DateTime CreatedTime { get; set; }
        DateTime StateChangedTime { get; set; }
        TrackedState CurrentState { get; set; }
    }

    public enum TrackedState
    {
        Undisplayed = 0,
        Displayed = 1,
        Deleted = 2
    }
}