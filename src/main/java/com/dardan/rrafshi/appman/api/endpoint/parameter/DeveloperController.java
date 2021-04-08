package com.dardan.rrafshi.appman.api.endpoint.parameter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dardan.rrafshi.appman.api.AppmanException;
import com.dardan.rrafshi.appman.api.repository.DeveloperRepository;
import com.dardan.rrafshi.appman.api.repository.model.Developer;


@RestController
public final class DeveloperController
{
	@Autowired
	private DeveloperRepository developerRepository;


	@PostMapping("/developers")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Developer createUser(@RequestBody final Developer body)
	{
		return this.developerRepository.save(body);
	}

	@GetMapping("/developers/{id}")
	public Developer retrieveUser(@PathVariable("id") final int developerID)
	{
		final var entity = this.developerRepository.findById(developerID);

		if (!entity.isPresent())
			throw new AppmanException.NotFound("The user with the ID '" + developerID + "' does not exist");

		return entity.get();
	}

	@PutMapping("/developers/{id}")
	@ResponseStatus(code = HttpStatus.CREATED)
	public Developer updateUser(@PathVariable("id") final int developerID, @RequestBody final Developer body)
	{
		final var entity = this.developerRepository.findById(developerID);

		if (!entity.isPresent())
			throw new AppmanException.NotFound("The user with the ID '" + developerID + "' does not exist");

		final var user = entity.get();
		user.update(body);

		return this.developerRepository.save(user);
	}

	@DeleteMapping("/developers/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void deleteUser(@PathVariable("id") final int developerID)
	{
		if (!this.developerRepository.existsById(developerID))
			throw new AppmanException.NotFound("The user with the ID '" + developerID + "' does not exist");

		this.developerRepository.deleteById(developerID);
	}
}
