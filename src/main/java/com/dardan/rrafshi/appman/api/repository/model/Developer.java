package com.dardan.rrafshi.appman.api.repository.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
public class Developer implements Serializable
{
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int developerID;

	private String firstName;
	private String familyName;
	private LocalDate birthday;

	private String userName;
	private String email;
	private String password;

	private String phoneNumber;
	private String mobileNumber;
	private LocalDateTime createdOn;


	public void update(final Developer other)
	{
		this.firstName = other.firstName;
		this.familyName = other.familyName;
		this.userName = other.userName;
		this.birthday = other.birthday;
		this.email = other.email;
		this.password = other.password;
		this.phoneNumber = other.phoneNumber;
		this.mobileNumber = other.mobileNumber;
	}

	@Override
	public boolean equals(final Object object)
	{
		if (this == object)
			return true;
		if (object == null)
			return false;

		if (this.getClass() != object.getClass())
			return false;

		final var other = (Developer) object;
		return this.developerID == other.developerID;
	}

	@Override
	public int hashCode()
	{
		return Objects.hash(this.developerID);
	}


	@JsonProperty
	public int getID()
	{
		return this.developerID;
	}

	@JsonIgnore
	public void setID(final int developerID)
	{
		this.developerID = developerID;
	}

	public String getFirstName()
	{
		return this.firstName;
	}

	public void setFirstName(final String firstName)
	{
		this.firstName = firstName;
	}

	public String getFamilyName()
	{
		return this.familyName;
	}

	public void setFamilyName(final String familyName)
	{
		this.familyName = familyName;
	}

	public String getUserName()
	{
		return this.userName;
	}

	public void setUserName(final String userName)
	{
		this.userName = userName;
	}

	public LocalDate getBirthday()
	{
		return this.birthday;
	}

	public void setBirthday(final LocalDate birthday)
	{
		this.birthday = birthday;
	}

	public String getEmail()
	{
		return this.email;
	}

	public void setEmail(final String email)
	{
		this.email = email;
	}

	@JsonIgnore
	public String getPassword()
	{
		return this.password;
	}

	@JsonProperty
	public void setPassword(final String password)
	{
		this.password = password;
	}

	public String getPhoneNumber()
	{
		return this.phoneNumber;
	}

	public void setPhoneNumber(final String phoneNumber)
	{
		this.phoneNumber = phoneNumber;
	}

	public String getMobileNumber()
	{
		return this.mobileNumber;
	}

	public void setMobileNumber(final String mobileNumber)
	{
		this.mobileNumber = mobileNumber;
	}

	@JsonProperty
	public LocalDateTime getCreatedOn()
	{
		return this.createdOn;
	}

	@JsonIgnore
	public void setCreatedOn(final LocalDateTime createdOn)
	{
		this.createdOn = createdOn;
	}
}
