using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace site_mangement_be.Entities;

[Table("contacts")]
public partial class Contact
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("first_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string? FirstName { get; set; }

    [Column("last_name")]
    [StringLength(50)]
    [Unicode(false)]
    public string? LastName { get; set; }

    [Column("email")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Email { get; set; }

    [Column("mobile")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Mobile { get; set; }

    [Column("role")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Role { get; set; }

    [Column("created_by")]
    [StringLength(50)]
    [Unicode(false)]
    public string? CreatedBy { get; set; }

    [Column("token")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Token { get; set; }

    [Column("created_on", TypeName = "datetime")]
    public DateTime? CreatedOn { get; set; }

    [Column("site_token")]
    [StringLength(50)]
    [Unicode(false)]
    public string? SiteToken { get; set; }
}
