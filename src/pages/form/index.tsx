import React, { PureComponent } from 'react';
import styles from './styles.module.scss';
import { ICardForm } from '../../components/interfaces';
import FormCard from '../../components/form-card/index';
// import content from '../../../custom';

export default class Form extends PureComponent<
  Record<string, never>,
  {
    email: string;
    date: string;
    select: string;
    checkbox: boolean;
    switcher: boolean;
    file?: File;
    emailError?: string | undefined;
    submitDisabled: boolean;
    cards: ICardForm[];
    imagePreviewUrl: string | ArrayBuffer | null;
  }
> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      submitDisabled: false,
      cards: [],
      imagePreviewUrl: '',
      email: '',
      date: '',
      select: '',
      checkbox: false,
      switcher: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.clearForm = this.clearForm.bind(this);

    this.input = React.createRef<HTMLInputElement>();
    this.date = React.createRef<HTMLInputElement>();
    this.select = React.createRef<HTMLSelectElement>();
    this.checkbox = React.createRef<HTMLInputElement>();
    this.switcher = React.createRef<HTMLInputElement>();
    this.file = React.createRef<HTMLInputElement>();
    this.fileInput = React.createRef<HTMLInputElement>();
  }

  input: React.RefObject<HTMLInputElement>;
  date: React.RefObject<HTMLInputElement>;
  select: React.RefObject<HTMLSelectElement>;
  checkbox: React.RefObject<HTMLInputElement>;
  file: React.RefObject<HTMLInputElement>;
  switcher: React.RefObject<HTMLInputElement>;
  fileInput: React.RefObject<HTMLInputElement>;

  async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = {
      email: this.input.current!.value,
      date: this.date.current!.value,
      select: this.select.current!.value,
      checkbox: this.checkbox.current!.checked,
      switcher: this.switcher.current!.checked,
      file: this.state.file!,
      imagePreviewUrl: this.state.imagePreviewUrl,
    };

    if ((await this.emailHandler()) && this.state.file) {
      await this.setState((state) => ({
        cards: [...state.cards, result],
      }));
      this.clearForm();
    }
  }

  clearForm = () => {
    this.setState({
      submitDisabled: false,
      imagePreviewUrl: '',
      email: '',
      date: '',
      select: '',
      checkbox: false,
      switcher: false,
      file: undefined,
    });

    this.input.current!.value = '';
    this.date.current!.value = '';
    this.select.current!.value = '';
    this.checkbox.current!.checked = false;
    this.switcher.current!.checked = false;
    this.fileInput.current!.value = '';
  };

  async emailHandler() {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg.test(String(this.input.current?.value).toLowerCase())) {
      await this.setState({ emailError: 'Invalid Email' });
      this.setState({ submitDisabled: true });
      return false;
    } else {
      await this.setState({ emailError: '' });
      return true;
    }
  }

  onChangeEmail() {
    this.setState({ submitDisabled: false });
  }

  handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files![0];
    reader.onloadend = (event) => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });

      console.log(event.target!.result);
    };

    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className={styles.main}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <label>
            E-mail:
            <input
              type="text"
              ref={this.input}
              className={styles.name}
              onChange={this.onChangeEmail}
              required
            />
          </label>
          {this.state && this.state['emailError'] && <h2>{this.state.emailError}</h2>}
          <label>
            Start date:
            <input type="date" defaultValue="2022-01-01" ref={this.date} required></input>
          </label>
          <label>
            Select charater:
            <select ref={this.select} required>
              <option value="Rick">Rick</option>
              <option value="Morty">Morty</option>
              <option value="Summer">Summer</option>
              <option value="Beth">Beth</option>
              <option value="Jerry">Jerry</option>
            </select>
          </label>
          <label>
            I agree to receive news by mail:
            <input type="checkbox" ref={this.checkbox} required></input>
          </label>
          <div className={styles['switch-wrapper']}>
            I agree to receive advertisements:
            <label className={styles.switch}>
              <input type="checkbox" ref={this.switcher}></input>
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
          <label>
            Select a file:
            <input
              type="file"
              id="myfile"
              name="myfile"
              accept=".jpg, .png, .jpeg"
              required
              onChange={(e) => this.handleImageChange(e)}
              ref={this.fileInput}
            ></input>
          </label>
          <input type="submit" value="Submit" disabled={this.state.submitDisabled} />
        </form>
        <div className={styles['cards-wrapper']}>
          {this.state.cards.length !== 0 &&
            this.state.cards.map((el, index) => (
              <FormCard cardData={el} key={`${index}${el.email}`} />
            ))}
        </div>
      </div>
    );
  }
}
