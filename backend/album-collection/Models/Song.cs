﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace album_collection.Models
{
    public class Song
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public int albumId { get; set; }
        public virtual Album Album { get; set; }

}
}
