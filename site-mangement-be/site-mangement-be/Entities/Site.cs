using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace site_mangement_be.Entities;

[Table("sites")]
public partial class Site
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    [StringLength(500)]
    [Unicode(false)]
    public string? Name { get; set; }

    [Column("longitude")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Longitude { get; set; }

    [Column("latitude")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Latitude { get; set; }

    [Column("city")]
    [StringLength(50)]
    [Unicode(false)]
    public string? City { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Token { get; set; }

    [Column("created_on", TypeName = "datetime")]
    public DateTime? CreatedOn { get; set; }

    [Column("created_by")]
    [StringLength(50)]
    [Unicode(false)]
    public string? CreatedBy { get; set; }
}
